from django.db import models

class Lead(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('converted', 'Converted'),
        ('lost', 'Lost'),
    ]
    lead_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Include this field
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


class Quotation(models.Model):
    quotation_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Include this field
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('draft', 'Draft'), ('sent', 'Sent'), ('accepted', 'Accepted'), ('rejected', 'Rejected')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Include this field
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Invoice for {self.quotation.lead.name}"


class LeadToInvoice(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, null=True, blank=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('created', 'Created'), ('converted', 'Converted')], default='created')

    def __str__(self):
        return f"Lead to Invoice: {self.lead.name} - {self.status}"


class Notification(models.Model):
    type = models.CharField(max_length=50)
    recipient = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=50, choices=[('sent', 'Sent'), ('failed', 'Failed')])
    timestamp = models.DateTimeField(auto_now_add=True)


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
