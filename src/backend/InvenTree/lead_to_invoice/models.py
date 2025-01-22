# from django.db import models

# class Lead(models.Model):
#     STATUS_CHOICES = [
#         ('new', 'New'),
#         ('contacted', 'Contacted'),
#         ('qualified', 'Qualified'),
#         ('converted', 'Converted'),
#         ('lost', 'Lost'),
#     ]
#     lead_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Include this field
#     name = models.CharField(max_length=255)
#     email = models.EmailField()
#     phone = models.CharField(max_length=15)
#     address = models.TextField()
#     source = models.CharField(max_length=255)
#     status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')
#     notes = models.TextField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name


# class Quotation(models.Model):
#     quotation_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Include this field
#     lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
#     tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
#     status = models.CharField(max_length=50, choices=[('draft', 'Draft'), ('sent', 'Sent'), ('accepted', 'Accepted'), ('rejected', 'Rejected')])
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# class Invoice(models.Model):
#     invoice_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Include this field
#     quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
#     amount_due = models.DecimalField(max_digits=10, decimal_places=2)
#     paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     due_date = models.DateTimeField()
#     status = models.CharField(max_length=50, choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')])
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Invoice for {self.quotation.lead.name}"


# class LeadToInvoice(models.Model):
#     lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
#     quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, null=True, blank=True)
#     invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, null=True, blank=True)
#     status = models.CharField(max_length=50, choices=[('created', 'Created'), ('converted', 'Converted')], default='created')

#     def __str__(self):
#         return f"Lead to Invoice: {self.lead.name} - {self.status}"


# # class Notification(models.Model):
# #     type = models.CharField(max_length=50)
# #     recipient = models.CharField(max_length=255)
# #     message = models.TextField()
# #     status = models.CharField(max_length=50, choices=[('sent', 'Sent'), ('failed', 'Failed')])
# #     timestamp = models.DateTimeField(auto_now_add=True)


# class NumberingSystemSettings(models.Model):
#     TYPE_CHOICES = [
#         ('Lead', 'Lead'),
#         ('Quotation', 'Quotation'),
#         ('Invoice', 'Invoice'),
#     ]

#     type = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
#     prefix = models.CharField(max_length=10, null=True, blank=True)
#     suffix = models.CharField(max_length=10, null=True, blank=True)
#     current_number = models.IntegerField(default=1)
#     increment_step = models.IntegerField(default=1)
#     reset_cycle = models.CharField(max_length=50, choices=[('monthly', 'Monthly'), ('yearly', 'Yearly')], null=True, blank=True)

#     def __str__(self):
#         return f"{self.type} Numbering System"


# class Notification(models.Model):
#     NOTIFICATION_TYPE_CHOICES = [
#         ('Email', 'Email'),
#         ('SMS', 'SMS'),
#         ('System', 'System'),
#     ]

#     STATUS_CHOICES = [
#         ('Pending', 'Pending'),
#         ('Sent', 'Sent'),
#         ('Failed', 'Failed'),
#     ]

#     type = models.CharField(max_length=50, choices=NOTIFICATION_TYPE_CHOICES)
#     recipient = models.CharField(max_length=255)
#     message = models.TextField()
#     status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
#     timestamp = models.DateTimeField(auto_now_add=True)

#     # New Relationships
#     lead = models.ForeignKey(
#         'Lead',
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True,
#         related_name='notifications'
#     )
#     quotation = models.ForeignKey(
#         'Quotation',
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True,
#         related_name='notifications'
#     )
#     invoice = models.ForeignKey(
#         'Invoice',
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True,
#         related_name='notifications'
#     )

#     def __str__(self):
#         return f"{self.type} Notification to {self.recipient}"

from django.utils import timezone
from django.db import models

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


# class Quotation(models.Model):
#     quotation_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  
#     lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
#     tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
#     status = models.CharField(max_length=50, choices=[('draft', 'Draft'), ('sent', 'Sent'), ('accepted', 'Accepted'), ('rejected', 'Rejected')])
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         verbose_name = "Quotation"
#         verbose_name_plural = "Quotations"
#         ordering = ['-created_at']  
#         unique_together = ['quotation_number']  
#         indexes = [
#             models.Index(fields=['lead', 'status']),  
#         ]

# class Quotation(models.Model):
#     quotation_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  
#     lead = models.ForeignKey('Lead', on_delete=models.CASCADE)
#     original_quotation = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='revisions')
#     revision_count = models.PositiveIntegerField(default=0)  # Tracks the revision number

#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
#     tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
#     status = models.CharField(
#         max_length=50, 
#         choices=[('draft', 'Draft'), ('sent', 'Sent'), ('accepted', 'Accepted'), ('rejected', 'Rejected')]
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         verbose_name = "Quotation"
#         verbose_name_plural = "Quotations"
#         ordering = ['-created_at']  
#         unique_together = ['quotation_number']  
#         indexes = [
#             models.Index(fields=['lead', 'status']),
#         ]

#     def save(self, *args, **kwargs):
#         if not self.quotation_number:
#             if self.original_quotation:
#                 # Generate a revised quotation number
#                 self.revision_count = self.original_quotation.revisions.count() + 1
#                 self.quotation_number = f"{self.original_quotation.quotation_number}.{self.revision_count}"
#             else:
#                 # Generate a new quotation number for the original
#                 self.quotation_number = self.generate_quotation_number()
#         super().save(*args, **kwargs)

#     def generate_quotation_number(self):
#         """
#         Generate a unique quotation number for new quotations.
#         This can be customized based on your system's requirements.
#         """
#         return f"{self.lead.id}-{int(self.created_at.timestamp())}"

#     def get_revisions(self):
#         """
#         Get all revisions for this quotation.
#         """
#         return self.revisions.all()



class Quotation(models.Model):
    quotation_number = models.CharField(
        max_length=50, unique=True, null=True, blank=True
    )
    lead = models.ForeignKey("Lead", on_delete=models.CASCADE)
    original_quotation = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="revisions",
    )
    revision_count = models.PositiveIntegerField(
        default=0
    )  # Tracks the revision number

    items = models.JSONField(
        default=list
    )  # List of items in the quotation (product IDs, names, quantities, prices)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ("draft", "Draft"),
            ("sent", "Sent"),
            ("accepted", "Accepted"),
            ("rejected", "Rejected"),
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quotation"
        verbose_name_plural = "Quotations"
        ordering = ["-created_at"]
        unique_together = ["quotation_number"]
        indexes = [
            models.Index(fields=["lead", "status"]),
        ]

    def save(self, *args, **kwargs):
        # Calculate item totals and update total_amount
        total = 0
        for item in self.items:
            item["total"] = item["quantity"] * item["price"]  # Calculate total for each item
            total += item["total"]  # Add item total to overall total

        self.total_amount = total

        if self.discount:
            discount_amount = (self.total_amount * self.discount) / 100
            self.total_amount -= discount_amount  # Apply discount to total amount

        if self.tax:
            tax_amount = (self.total_amount * self.tax) / 100
            self.total_amount += tax_amount  # Apply tax to total amount

        # Ensure the final total amount is not negative
        self.total_amount = max(self.total_amount, 0)

        if not self.quotation_number:
            if self.original_quotation:
                # Generate a revised quotation number
                self.revision_count = self.original_quotation.revisions.count() + 1
                self.quotation_number = (
                    f"{self.original_quotation.quotation_number}.{self.revision_count}"
                )
            else:
                # Generate a new quotation number for the original
                self.quotation_number = self.generate_quotation_number()

        super().save(*args, **kwargs)

    def generate_quotation_number(self):
        """
        Generate a unique quotation number for new quotations.
        This can be customized based on your system's requirements.
        """
        return f"{self.lead.id}-{int(self.created_at.timestamp())}"

    def get_revisions(self):
        """
        Get all revisions for this quotation.
        """
        return self.revisions.all()


    
class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, default=1)  
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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



