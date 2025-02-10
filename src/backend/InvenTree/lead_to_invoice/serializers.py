from rest_framework import serializers
from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification, LeadToInvoice

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id','lead_number', 'name', 'email', 'phone', 'status', 'created_at', 'updated_at']  # Explicit fields

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = ['id', 'lead', 'quotation_number', 'total_amount', 'status', 'created_at']


class InvoiceSerializer(serializers.ModelSerializer):
    quotation_number = serializers.SerializerMethodField()
    class Meta:
        model = Invoice
        fields = ['id', 'quotation','quotation_number', 'invoice_number','total_amount','paid_amount', 'amount_due', 'status', 'created_at']
 
 
    def get_quotation_number(self, obj):
        return obj.quotation.quotation_number if obj.quotation else None
    
class NumberingSystemSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberingSystemSettings
        fields = ['type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'type', 'recipient', 'status', 'message', 'timestamp', 'lead', 'quotation', 'invoice']

class LeadToInvoiceSerializer(serializers.ModelSerializer):
    lead = LeadSerializer() 
    quotation = QuotationSerializer(required=False) 
    invoice = InvoiceSerializer(required=False) 

    class Meta:
        model = LeadToInvoice
        fields = '__all__'

   
    def validate(self, data):
        if not data.get('quotation') and not data.get('invoice'):
            raise serializers.ValidationError("Either Quotation or Invoice must be provided.")
        return data
