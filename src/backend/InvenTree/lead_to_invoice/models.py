from decimal import Decimal
import decimal
from django.utils import timezone
from django.db import models
from datetime import datetime
from django.db.models import Sum
from rest_framework.exceptions import ValidationError

from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator
from django.core.exceptions import ValidationError
import re

# Custom validators
def validate_name(value):
    if not re.match("^[a-zA-Z ]*$", value):
        raise ValidationError('Name can only contain alphabets and spaces')
    if len(value.strip()) < 2:
        raise ValidationErr or('Name must be at least 2 characters long')

def validate_gmail(value):
    if not value.lower().endswith('@gmail.com'):
        raise ValidationError('Only Gmail addresses are allowed')

class Lead(models.Model):
    STATUS_CHOICES = [('new', 'New'),('contacted', 'Contacted'),('qualified', 'Qualified'),('converted', 'Converted'),('lost', 'Lost')]

    lead_number = models.CharField(max_length=50, unique=True, null=True, blank=True)

    name = models.CharField(max_length=255,validators=[validate_name],help_text="Enter only alphabetical characters and spaces")

    email = models.EmailField(validators=[EmailValidator(),validate_gmail],help_text="Enter a valid Gmail address")

    phone = models.CharField(max_length=15,validators=[RegexValidator(regex=r'^\d{10,15}$',message='Phone number must be between 10 and 15 digits'),MinLengthValidator(10)],help_text="Enter at least 10 digits")

    address = models.TextField(validators=[MinLengthValidator(10, 'Address must be at least 10 characters long')])

    source = models.CharField(max_length=255,validators=[MinLengthValidator(2, 'Source must be at least 2 characters long')])

    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def generate_lead_number(self):
        """
        Generate a sequential lead number without gaps.
        Format: LD-SEQUENCE-YEAR
        """
        current_year = timezone.now().year
    
        latest_lead = Lead.objects.filter(
            created_at__year=current_year,
            lead_number__isnull=False
        ).order_by('-lead_number').first()

        if latest_lead and latest_lead.lead_number:
            try:
                parts = latest_lead.lead_number.split('-')
                if len(parts) == 3 and parts[0] == 'LD':
                    last_number = int(parts[1])
                    new_number = last_number + 1
                else:
                    new_number = 1
            except (ValueError, IndexError):
                new_number = 1
        else:
            new_number = 1

        lead_number = f"LD-{new_number:03d}-{current_year}"
    
        while Lead.objects.filter(lead_number=lead_number).exists():
            new_number += 1
            lead_number = f"LD-{new_number:03d}-{current_year}"

        return lead_number

    def save(self, *args, **kwargs):
        if not self.lead_number:
            self.lead_number = self.generate_lead_number()
        
        self.full_clean()
        super().save(*args, **kwargs)


    def clean(self):
        super().clean()
        
        if self.phone:
            if not self.phone.isdigit():
                raise ValidationError({'phone': 'Phone number can only contain digits'})

        if self.address and len(self.address.strip()) < 10:
            raise ValidationError({'address': 'Address is too short'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.lead_number})"

    class Meta:
        verbose_name = "Lead"
        verbose_name_plural = "Leads"
        ordering = ['-created_at']
        unique_together = ['lead_number']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['phone']),
            models.Index(fields=['status']),
        ]


class Quotation(models.Model):
    quotation_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    lead = models.ForeignKey("Lead", on_delete=models.CASCADE)
    original_quotation = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL, related_name="revisions"
    )
    revision_count = models.PositiveIntegerField(default=0)  
    items = models.JSONField(default=list)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    status = models.CharField(
        max_length=50,
        choices=[("draft", "Draft"), ("sent", "Sent"), ("accepted", "Accepted"), ("rejected", "Rejected")],
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quotation"
        verbose_name_plural = "Quotations"
        ordering = ["-created_at"]
        unique_together = ["quotation_number"]
        indexes = [models.Index(fields=["lead", "status"])]

    def save(self, *args, **kwargs):
        if isinstance(self.total_amount, (float, str)):
            self.total_amount = Decimal(str(self.total_amount))
        
        if self.discount and isinstance(self.discount, (float, str)):
            self.discount = Decimal(str(self.discount))
        if self.tax and isinstance(self.tax, (float, str)):
            self.tax = Decimal(str(self.tax))

        if not self.quotation_number:
            if self.original_quotation:
                revisions = Quotation.objects.filter(original_quotation=self.original_quotation)
                if revisions.exists():
                    max_revision = max(
                        [int(revision.quotation_number.split(".")[-1]) 
                         for revision in revisions 
                         if "." in revision.quotation_number],
                        default=0,
                    )
                    self.quotation_number = f"{self.original_quotation.quotation_number}.{max_revision + 1}"
                else:
                    self.quotation_number = f"{self.original_quotation.quotation_number}.1"
            else:
                self.quotation_number = self.generate_quotation_number()

        super().save(*args, **kwargs)

        if self.status == "accepted":
            self.create_invoice()

    def create_invoice(self):
        """Creates an unpaid invoice when a quotation is accepted."""
        from decimal import Decimal
        
        if not Invoice.objects.filter(quotation=self).exists():
            try:
                Invoice.objects.create(
                    quotation=self,
                    lead=self.lead,
                    total_amount=Decimal(str(self.total_amount)),
                    amount_due=Decimal(str(self.total_amount)),
                    paid_amount=Decimal('0.00'),
                    status='unpaid',
                    due_date=timezone.now() + timezone.timedelta(days=30)
                )
            except (TypeError, ValueError) as e:
                raise ValidationError(f"Error creating invoice: {str(e)}")


    def __str__(self):
        return self.quotation_number
    

    def generate_quotation_number(self):
        """
        Generate a unique quotation number for new quotations.
        The format will be QN-MONTH-YEAR-SEQUENCE.
        """
        current_month = self.created_at.month
        current_year = self.created_at.year
    
        latest_quotation = Quotation.objects.filter(
            created_at__month=current_month,
            created_at__year=current_year,
            original_quotation__isnull=True  
        ).order_by('-quotation_number').first()

        if latest_quotation and latest_quotation.quotation_number:
            try:
                last_number = int(latest_quotation.quotation_number.split('-')[-1])
                new_number = last_number + 1
            except (ValueError, IndexError):
                new_number = 1
        else:
            new_number = 1

        return f"QN-{current_month:02d}-{current_year}-{new_number}"

  
class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, default=1)  
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_date = models.DateTimeField()
    status = models.CharField(
        max_length=50, 
        choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')]
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def generate_invoice_number(self):
        """
        Generate a unique invoice number.
        Format: INV-SEQUENCE-YEAR
        """
        current_year = timezone.now().year
    
        latest_invoice = Invoice.objects.filter(
            created_at__year=current_year
        ).order_by('-invoice_number').first()

        if latest_invoice and latest_invoice.invoice_number:
            try:
                parts = latest_invoice.invoice_number.split('-')
                if len(parts) == 3: 
                    last_number = int(parts[1])
                    new_number = last_number + 1
                else:
                    new_number = 1
            except (ValueError, IndexError):
                new_number = 1
        else:
            new_number = 1

        invoice_number = f"INV-{new_number}-{current_year}"
        
        while Invoice.objects.filter(invoice_number=invoice_number).exists():
            new_number += 1
            invoice_number = f"INV-{new_number}-{current_year}"
        
        return invoice_number


    def save(self, *args, **kwargs):
        if self.quotation:
            try:
                self.total_amount = Decimal(str(self.quotation.total_amount))
                self.paid_amount = Decimal(str(self.paid_amount)) if self.paid_amount else Decimal('0')

                total_paid = Invoice.objects.filter(
                    quotation=self.quotation
                ).exclude(
                    pk=self.pk  
                ).aggregate(
                    total_paid=Sum('paid_amount')
                )['total_paid'] or Decimal('0')

                remaining_amount_due = max(self.total_amount - total_paid, Decimal('0'))

                if self.paid_amount > remaining_amount_due:
                    raise ValidationError(
                        f"Payment amount ({self.paid_amount}) exceeds remaining balance ({remaining_amount_due})"
                    )

                self.amount_due = max(remaining_amount_due - self.paid_amount, Decimal('0'))

                if self.amount_due == Decimal('0'):
                    self.status = 'paid'
                elif Decimal('0') < self.amount_due < self.total_amount:
                    self.status = 'partially_paid'
                else:
                    self.status = 'unpaid'

                if not self.invoice_number:
                    self.invoice_number = self.generate_invoice_number()

            except (TypeError, ValueError, decimal.InvalidOperation) as e:
                raise ValidationError(f"Invalid amount format: {str(e)}")

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"
        ordering = ['-created_at']  
        unique_together = ['invoice_number']  
        indexes = [
            models.Index(fields=['lead', 'status']),  
        ]

class LeadToInvoice(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, null=True, blank=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('created', 'Created'), ('converted', 'Converted')], default='created')
    created_at = models.DateTimeField(auto_now_add=True) 


    def __str__(self):
        return f"Lead to Invoice: {self.lead.name} - {self.status}"

    class Meta:
        verbose_name = "Lead to Invoice"
        verbose_name_plural = "Leads to Invoices"
        ordering = ['-created_at']  
        indexes = [
            models.Index(fields=['lead', 'status']),  
        ]


class NumberingSystemSettings(models.Model):
    TYPE_CHOICES = [
        ('Lead', 'Lead'),
        ('Quotation', 'Quotation'),
        ('Invoice', 'Invoice'),
    ]

    type = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
    prefix = models.CharField(max_length=10, null=True, blank=True)
    suffix = models.CharField(max_length=10, null=True, blank=True)
    current_number = models.IntegerField(default=1)
    increment_step = models.IntegerField(default=1)
    reset_cycle = models.CharField(max_length=50, choices=[('monthly', 'Monthly'), ('yearly', 'Yearly')], null=True, blank=True)

    def __str__(self):
        return f"{self.type} Numbering System"

    class Meta:
        verbose_name = "Numbering System Setting"
        verbose_name_plural = "Numbering System Settings"
        indexes = [
            models.Index(fields=['type']), 
        ]


class Notification(models.Model):
    NOTIFICATION_TYPE_CHOICES = [
        ('Email', 'Email'),
        ('SMS', 'SMS'),
        ('System', 'System'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Sent', 'Sent'),
        ('Failed', 'Failed'),
    ]

    type = models.CharField(max_length=50, choices=NOTIFICATION_TYPE_CHOICES)
    recipient = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    lead = models.ForeignKey(
        'Lead',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='notifications'
    )
    quotation = models.ForeignKey(
        'Quotation',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='notifications'
    )
    invoice = models.ForeignKey(
        'Invoice',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='notifications'
    )

    def __str__(self):
        return f"{self.type} Notification to {self.recipient}"

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        ordering = ['-timestamp']  
        indexes = [
            models.Index(fields=['status']), 
        ]



