from decimal import Decimal
from django.utils import timezone
from django.db import models
from datetime import datetime
from django.db.models import Sum
from rest_framework.exceptions import ValidationError

class Lead(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('converted', 'Converted'),
        ('lost', 'Lost'),
    ]
    lead_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    source = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Lead"
        verbose_name_plural = "Leads"
        ordering = ['-created_at']  
        unique_together = ['lead_number'] 
        indexes = [
            models.Index(fields=['email']),  
        ]


class Quotation(models.Model):
    quotation_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    lead = models.ForeignKey("Lead", on_delete=models.CASCADE)
    original_quotation = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL, related_name="revisions"
    )
    revision_count = models.PositiveIntegerField(default=0)  # Tracks the revision number
    items = models.JSONField(default=list)  # List of items in the quotation (IDs, names, quantities, prices)
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
        if not self.quotation_number:
            if self.original_quotation:
                revisions = Quotation.objects.filter(original_quotation=self.original_quotation)
                if revisions.exists():
                    max_revision = max(
                        [int(revision.quotation_number.split(".")[-1]) for revision in revisions if "." in revision.quotation_number],
                        default=0,
                    )
                    self.quotation_number = f"{self.original_quotation.quotation_number}.{max_revision + 1}"
                else:
                    self.quotation_number = f"{self.original_quotation.quotation_number}.1"
            else:
                self.quotation_number = self.generate_quotation_number()
        super().save(*args, **kwargs)

    def generate_quotation_number(self):
        """
        Generate a unique quotation number for new quotations.
        The format will be QN-MONTH-YEAR.
        """
        current_month = self.created_at.month
        current_year = self.created_at.year
        revision_count = (
            Quotation.objects.filter(created_at__month=current_month, created_at__year=current_year).count() + 1
        )
        return f"QN-{current_month:02d}-{current_year}-{revision_count}"

 
class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, default=1)  
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_amount=models.DecimalField(max_digits=10, decimal_places=2,default=0)


    # def save(self, *args, **kwargs):
    #     if self.quotation:
    #         self.total_amount= self.quotation.total_amount
    #         self.amount_due = max(self.total_amount - self.paid_amount, 0)


    #     super().save(*args, **kwargs)

    def save(self, *args, **kwargs):
        if self.quotation:
            self.total_amount = self.quotation.total_amount

            total_paid = Invoice.objects.filter(quotation=self.quotation).aggregate(total_paid=Sum('paid_amount'))['total_paid'] or Decimal(0)

            remaining_amount_due = self.total_amount - total_paid

            

            try:
                if self.paid_amount > remaining_amount_due:
                    raise ValueError(f"Paid amount ({self.paid_amount}) exceeds the remaining amount due ({remaining_amount_due}) for this quotation.")

            except ValueError as e:
                raise ValidationError(str(e))
            
            if remaining_amount_due < 0:
                remaining_amount_due = Decimal(0)

            self.amount_due = max(remaining_amount_due - Decimal(self.paid_amount), Decimal(0))

             
            self.amount_due = max(remaining_amount_due - Decimal(self.paid_amount), Decimal(0))

            if self.amount_due == 0:
                self.status = 'paid'
            elif self.amount_due < self.total_amount and self.amount_due > 0:
                self.status = 'partially_paid'
            else:
                self.status = 'unpaid'

        super().save(*args, **kwargs)
 
    def __str__(self):
        return f"Invoice for {self.quotation.lead.name}"

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

    # New Relationships
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



