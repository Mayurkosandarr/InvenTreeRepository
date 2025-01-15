from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lead, Quotation, Invoice, NumberingSystemSettings,Notification
# from lead_to_invoice.models import Lead, Quotation, Invoice, NumberingSystemSettings,Notification
from django.shortcuts import get_object_or_404

def generate_number(type):
    # Fetch the numbering settings for the given type (Lead, Quotation, Invoice)
    settings = get_object_or_404(NumberingSystemSettings, type=type)
    current_number = settings.current_number
    new_number = f"{settings.prefix or ''}{current_number}{settings.suffix or ''}"
    
    # Update the current number for the next entry
    settings.current_number += settings.increment_step
    settings.save()
    
    return new_number

class NumberingSystemSettingsAPI(APIView):
    def get(self, request):
        settings = NumberingSystemSettings.objects.all()
        data = [{
            'type': setting.type,
            'prefix': setting.prefix,
            'suffix': setting.suffix,
            'current_number': setting.current_number,
            'increment_step': setting.increment_step,
            'reset_cycle': setting.reset_cycle
        } for setting in settings]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        try:
            settings, created = NumberingSystemSettings.objects.update_or_create(
                type=data['type'],
                defaults={
                    'prefix': data.get('prefix', ''),
                    'suffix': data.get('suffix', ''),
                    'current_number': data.get('current_number', 1),
                    'increment_step': data.get('increment_step', 1),
                    'reset_cycle': data.get('reset_cycle', '')
                }
            )
            return Response({"message": "Numbering system settings updated!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LeadAPI(APIView):
    def post(self, request):
        data = request.data
        data['lead_number'] = generate_number('Lead')
        
        
        lead = Lead.objects.create(**data)
        return Response({"message": "Lead created!", "lead_number": lead.lead_number}, status=status.HTTP_201_CREATED)

    def get(self, request):
        leads = Lead.objects.all()
        return Response([lead.name for lead in leads])

class QuotationAPI(APIView):
    def post(self, request):
        data = request.data
        lead = Lead.objects.get(id=data['lead_id'])
        data['quotation_number'] = generate_number('Quotation')
        quotation = Quotation.objects.create(lead=lead, **data)
        return Response({"message": "Quotation created!", "quotation_number": quotation.quotation_number}, status=status.HTTP_201_CREATED)

    def get(self, request):
        quotations = Quotation.objects.all()
        return Response([quotation.id for quotation in quotations])

class InvoiceAPI(APIView):
    def post(self, request):
        data = request.data
        quotation = Quotation.objects.get(id=data['quotation_id'])
        data['invoice_number'] = generate_number('Invoice')
        invoice = Invoice.objects.create(quotation=quotation, **data)
        return Response({"message": "Invoice created!", "invoice_number": invoice.invoice_number}, status=status.HTTP_201_CREATED)

    def get(self, request):
        invoices = Invoice.objects.all()
        return Response([invoice.id for invoice in invoices])

class NotificationAPI(APIView):
    def post(self, request):
        data = request.data
        # Create the notification with the provided data
        notification = Notification.objects.create(**data)
        return Response({"message": "Notification created!", "notification_id": notification.id}, status=status.HTTP_201_CREATED)

    def get(self, request):
        # Retrieve all notifications
        notifications = Notification.objects.all()
        # Return a list of notification messages
        return Response([notif.message for notif in notifications])
