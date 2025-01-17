# from rest_framework import serializers
# from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification,LeadToInvoice

# # Lead Serializer
# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = '__all__'  # Or list specific fields you want to include

# # Quotation Serializer
# class QuotationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Quotation
#         fields = '__all__'

# # Invoice Serializer
# class InvoiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Invoice
#         fields = '__all__'

# # NumberingSystemSettings Serializer
# class NumberingSystemSettingsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = NumberingSystemSettings
#         fields = '__all__'

# # Notification Serializer
# class NotificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Notification
#         fields = '__all__'

# # LeadToInvoice Serializer
# class LeadToInvoiceSerializer(serializers.ModelSerializer):
#     lead = serializers.PrimaryKeyRelatedField(queryset=Lead.objects.all())
#     quotation = serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all(), required=False)
#     invoice = serializers.PrimaryKeyRelatedField(queryset=Invoice.objects.all(), required=False)

#     class Meta:
#         model = LeadToInvoice
#         fields = '__all__'


from rest_framework import serializers
from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification, LeadToInvoice

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'phone', 'status', 'created_at', 'updated_at']  # Explicit fields

# Quotation Serializer
class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = ['id', 'lead', 'quotation_number', 'total_amount', 'status', 'created_at']

# Invoice Serializer
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['id', 'quotation', 'invoice_number', 'amount_due', 'status', 'created_at']

# NumberingSystemSettings Serializer
class NumberingSystemSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberingSystemSettings
        fields = ['type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle']

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'type', 'recipient', 'status', 'message', 'timestamp', 'lead', 'quotation', 'invoice']

# LeadToInvoice Serializer (with nested serializers)
class LeadToInvoiceSerializer(serializers.ModelSerializer):
    lead = LeadSerializer()  # Nested Lead serializer
    quotation = QuotationSerializer(required=False)  # Nested Quotation serializer if available
    invoice = InvoiceSerializer(required=False)  # Nested Invoice serializer if available

    class Meta:
        model = LeadToInvoice
        fields = '__all__'

    # Custom validation to ensure either Quotation or Invoice is provided
    def validate(self, data):
        if not data.get('quotation') and not data.get('invoice'):
            raise serializers.ValidationError("Either Quotation or Invoice must be provided.")
        return data
