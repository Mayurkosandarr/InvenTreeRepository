from datetime import datetime
from rest_framework import serializers
from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification, LeadToInvoice
import pytz
from django.utils import timezone

class LeadSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    class Meta:
        model = Lead
        fields = ['id','lead_number', 'name', 'email', 'phone', 'address','source','status', 'created_at', 'updated_at']  # Explicit fields

    def get_created_at(self, obj):
        return timezone.localtime(
            obj.created_at, 
            pytz.timezone('Asia/Kolkata')
        ).strftime("%d-%m-%Y %I:%M %p")  # Format: DD-MM-YYYY HH:MM AM/PM
    
    def get_updated_at(self, obj):
        return timezone.localtime(
            obj.updated_at, 
            pytz.timezone('Asia/Kolkata')
        ).strftime("%d-%m-%Y %I:%M %p")  # Format: DD-MM-YYYY HH:MM AM/PM



class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = ['id', 'lead', 'quotation_number', 'total_amount', 'status', 'created_at']


class InvoiceSerializer(serializers.ModelSerializer):
    quotation_number = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    due_date = serializers.SerializerMethodField()  # Add SerializerMethodField for due_date

    class Meta:
        model = Invoice
        fields = ['id', 'quotation', 'quotation_number', 'invoice_number', 
                 'total_amount', 'paid_amount', 'amount_due', 'status', 
                 'created_at', 'due_date', 'lead']
    
    def get_quotation_number(self, obj):
        return obj.quotation.quotation_number if obj.quotation else None
    
    def get_due_date(self, obj):
        if not obj.due_date:
            return None

        # Convert string to datetime if necessary
        due_date = obj.due_date
        if isinstance(due_date, str):
            try:
                due_date = datetime.strptime(due_date, "%Y-%m-%d")
            except ValueError:
                return None

        # Ensure due_date is timezone-aware
        if timezone.is_naive(due_date):
            due_date = timezone.make_aware(due_date, timezone=pytz.UTC)

        # Convert to Asia/Kolkata timezone
        india_tz = pytz.timezone('Asia/Kolkata')
        local_due_date = due_date.astimezone(india_tz)

        return local_due_date.strftime("%d-%m-%Y")
    
    def get_created_at(self, obj):
        return timezone.localtime(
            obj.created_at, 
            pytz.timezone('Asia/Kolkata')
        ).strftime("%d-%m-%Y")
    
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


from part.models import Part

class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = ['id', 'name']  # Include only the fields you need