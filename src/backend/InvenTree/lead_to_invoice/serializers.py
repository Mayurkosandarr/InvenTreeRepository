from rest_framework import serializers
from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification,LeadToInvoice

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'  # Or list specific fields you want to include

# Quotation Serializer
class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'

# Invoice Serializer
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

# NumberingSystemSettings Serializer
class NumberingSystemSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberingSystemSettings
        fields = '__all__'

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# LeadToInvoice Serializer
class LeadToInvoiceSerializer(serializers.ModelSerializer):
    lead = serializers.PrimaryKeyRelatedField(queryset=Lead.objects.all())
    quotation = serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all(), required=False)
    invoice = serializers.PrimaryKeyRelatedField(queryset=Invoice.objects.all(), required=False)

    class Meta:
        model = LeadToInvoice
        fields = '__all__'
