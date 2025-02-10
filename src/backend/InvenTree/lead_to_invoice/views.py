import datetime
from gettext import translation
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification, LeadToInvoice
from .serializers import LeadSerializer, QuotationSerializer, InvoiceSerializer, NumberingSystemSettingsSerializer, NotificationSerializer, LeadToInvoiceSerializer
import re
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from part.models import Part
from datetime import datetime
from django.db import transaction
from django.utils import timezone


def generate_number(type):
    settings = NumberingSystemSettings.objects.get(type=type)
    current_number = settings.current_number
    new_number = f"{settings.prefix or ''}{current_number}{settings.suffix or ''}"
    settings.current_number += settings.increment_step
    settings.save()
    return new_number


class CreateLeadView(APIView):
    queryset = Lead.objects.all()

    def post(self, request):

        try:
            data = request.data
            data['lead_number'] = generate_number('Lead')
            lead = Lead.objects.create(**data)
            return Response({"message": "Lead created!", "lead_number": lead.lead_number}, status=status.HTTP_201_CREATED)
        


        except Exception as e:
              return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request):
        leads = Lead.objects.all()
        serializer = LeadSerializer(leads, many=True)
        return Response(serializer.data)



 
class CreateQuotationView(APIView):
    def post(self, request):
        data = request.data
        parent_quotation_id = data.get("parent_quotation_id")
 
 
        try:
            lead = Lead.objects.get(id=data["lead_id"])
        except Lead.DoesNotExist:
            return Response(
                {"error": "Lead not found"}, status=status.HTTP_400_BAD_REQUEST
            )
 
        items = data.get("items")
        if not isinstance(items, list) or not items:
            return Response(
                {"error": "Items must be a non-empty list"},
                status=status.HTTP_400_BAD_REQUEST,
            )
 
        items.sort(key=lambda x: x.get("item_name", ""))
        for item in items:
            part_id = item.get("part_id")
            if not part_id:
                return Response(
                    {"error": "Each item must have a part_id"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
 
            try:
                part = Part.objects.get(id=part_id)
            except Part.DoesNotExist:
                return Response(
                    {"error": f"Part with ID {part_id} not found"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
 
            item["part_id"] = part.id
 
        discount = data.get("discount", 0)
        tax = data.get("tax", 0)
 
        try:
            discount = float(discount)
            tax = float(tax)
        except ValueError:
            return Response(
                {"error": "Discount and tax must be valid numbers"},
                status=status.HTTP_400_BAD_REQUEST,
            )
 
        total_amount = 0
        for item in items:
            try:
                item["total"] = item["quantity"] * item["price"]
                total_amount += item["total"]
            except KeyError:
                return Response(
                    {"error": "Each item must have quantity and price"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
 
        total_amount -= total_amount * (discount / 100)
        total_amount += total_amount * (tax / 100)
 
        with transaction.atomic():
        
            if parent_quotation_id:
                try:
                    parent_quotation = Quotation.objects.get(id=parent_quotation_id)
            
                    base_quotation = parent_quotation
                    while base_quotation.original_quotation:
                        base_quotation = base_quotation.original_quotation
            
                    all_revisions = Quotation.objects.filter(
                        quotation_number__startswith=base_quotation.quotation_number + '.'
                    ).order_by('-quotation_number')
            
                    highest_revision = 0
                    for revision in all_revisions:
                        try:
                            revision_num = int(revision.quotation_number.split('.')[-1])
                            highest_revision = max(highest_revision, revision_num)
                        except (ValueError, IndexError):
                            continue
            
                    next_revision = highest_revision + 1
                    data["quotation_number"] = f"{base_quotation.quotation_number}.{next_revision}"
                    original_quotation = base_quotation
            
                except Quotation.DoesNotExist:
                    return Response(
                        {"error": "Original quotation not found"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            else:
                current_year = timezone.now().year
                last_quotation = (
                    Quotation.objects.filter(
                        quotation_number__regex=r'^QN-\d+-\d+$',  
                        created_at__year=current_year
                    )
                    .order_by('-quotation_number')
                    .first()
                )
        
                if last_quotation:
                    match = re.search(r'QN-(\d+)-\d+$', last_quotation.quotation_number)
                    if match:
                        last_number = int(match.group(1))
                        next_number = last_number + 1
                    else:
                        next_number = 1
                else:
                    next_number = 1
        
                data["quotation_number"] = f"QN-{next_number:03d}-{current_year}"
                original_quotation = None

            quotation = Quotation.objects.create(
                lead=lead,
                quotation_number=data["quotation_number"],
                items=items,
                total_amount=total_amount,
                discount=discount,
                tax=tax,
                status=data.get("status", "draft"),
                original_quotation=original_quotation,
            )

            return Response(
                {
                    "message": "Quotation created!",
                    "quotation_id": quotation.id,
                    "quotation_number": quotation.quotation_number,
                    "items": quotation.items,
                    "discount": f"{int(quotation.discount)}%",
                    "tax": f"{int(quotation.tax)}%",
                    "total_amount": quotation.total_amount,
                    "status": quotation.status,
                    "parent_quotation_id": parent_quotation_id,
                },
                status=status.HTTP_201_CREATED,
            )
 
    def get(self, request, quotation_id=None):
        if quotation_id:
            try:
                quotation = Quotation.objects.get(id=quotation_id)
                return Response(QuotationSerializer(quotation).data)
            except Quotation.DoesNotExist:
                return Response(
                    {"error": "Quotation not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
 
        quotations = Quotation.objects.all()
        return Response(QuotationSerializer(quotations, many=True).data)
 
class NumberingSystemSettingsAPI(APIView):
    queryset = NumberingSystemSettings.objects.all()
 
    def get(self, request):
        settings = NumberingSystemSettings.objects.all()
        serializer = NumberingSystemSettingsSerializer(settings, many=True)
        return Response(serializer.data)
 
 
class NotificationAPI(APIView):
    queryset = Notification.objects.all()
 
    def post(self, request):
        data = request.data
 
       
        lead_id = data.get("lead")
        if lead_id:
            try:
                lead_instance = Lead.objects.get(id=lead_id)
                data["lead"] = lead_instance
            except Lead.DoesNotExist:
                return Response(
                    {"message": "Lead not found!"}, status=status.HTTP_404_NOT_FOUND
                )
 
        quotation_id = data.get("quotation")
        if quotation_id:
            try:
                quotation_instance = Quotation.objects.get(id=quotation_id)
                data["quotation"] = quotation_instance
            except Quotation.DoesNotExist:
                return Response(
                    {"message": "Quotation not found!"},
                    status=status.HTTP_404_NOT_FOUND,
                )
 
        try:
            notification = Notification.objects.create(**data)
            return Response(
                {
                    "message": "Notification created!",
                    "notification_id": notification.id,
                },
                status=status.HTTP_201_CREATED,
            )
 
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
 
    def get(self, request):
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

class CreateInvoiceView(APIView):
    queryset = Invoice.objects.all()

    def post(self, request):
        data = request.data
        try:
            quotation = Quotation.objects.get(id=data['quotation_id'])  
        except Quotation.DoesNotExist:
            return Response({"error": "Quotation not found"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            lead= Lead.objects.get(id=data['lead_id'])

        except Lead.DoesNotExist:
            return Response({"error":"Lead not found"}, status.HTTP_400_BAD_REQUEST)
            

        data['invoice_number'] = generate_number('Invoice')
        invoice = Invoice.objects.create(quotation=quotation, **data)
        serializer = InvoiceSerializer(invoice)
        return Response({"message": "Invoice created!", "invoice": serializer.data}, status=status.HTTP_201_CREATED)

    def get(self, request):
        invoices = Invoice.objects.all()
        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data)



class LeadToInvoiceView(APIView):
    queryset = LeadToInvoice.objects.all()

    def get(self, request):
        leads = Lead.objects.all()  
        quotations = Quotation.objects.filter(lead__in=leads)
        invoices = Invoice.objects.filter(quotation__in=quotations)

        data = []
        for invoice in invoices:
            data.append({
                'lead': invoice.quotation.lead.name,
                'quotation_number': invoice.quotation.quotation_number,
                'invoice_number': invoice.invoice_number,
                'total_amount': str(invoice.quotation.total_amount),
                'paid_amount': str(invoice.paid_amount),
                'amount_due': str(invoice.amount_due - invoice.paid_amount),  
                'status': invoice.status,
            })

        return Response(data)

    def post(self, request):
        data = request.data

        serializer = LeadToInvoiceSerializer(data=data)
        if serializer.is_valid():
            lead_to_invoice = serializer.save()  
            return Response({"message": "Lead to Invoice record created!", "id": lead_to_invoice.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NumberingSystemSettingsAPI(APIView):
    queryset = NumberingSystemSettings.objects.all()

    def get(self, request):
        settings = NumberingSystemSettings.objects.all()
        serializer = NumberingSystemSettingsSerializer(settings, many=True)
        return Response(serializer.data)


class NotificationAPI(APIView):
    queryset = Notification.objects.all()

    def post(self, request):
        data = request.data
        
        lead_id = data.get('lead')
        if lead_id:
            try:
                lead_instance = Lead.objects.get(id=lead_id)
                data['lead'] = lead_instance
            except Lead.DoesNotExist:
                return Response({"message": "Lead not found!"}, status=status.HTTP_404_NOT_FOUND)

        quotation_id = data.get('quotation')
        if quotation_id:
            try:
                quotation_instance = Quotation.objects.get(id=quotation_id)
                data['quotation'] = quotation_instance
            except Quotation.DoesNotExist:
                return Response({"message": "Quotation not found!"}, status=status.HTTP_404_NOT_FOUND)

        try:
            notification = Notification.objects.create(**data)
            return Response({"message": "Notification created!", "notification_id": notification.id}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

from datetime import datetime



class CreateRevisedQuotationAPI(APIView):
    def post(self, request):
        lead_id = request.data.get("lead_id")
        items = request.data.get("items", [])
        discount = request.data.get("discount", 0)
        tax = request.data.get("tax", 0)
        quotation_status = request.data.get("status", "draft")
        original_quotation_id = request.data.get("original_quotation_id")  # ID for revision

        if not items:
            return Response({"error": "Items are required."}, status=status.HTTP_400_BAD_REQUEST)

        original_quotation = None
        quotation_number = None

        if original_quotation_id:
            try:
                original_quotation = Quotation.objects.get(id=original_quotation_id)

                existing_revisions = Quotation.objects.filter(original_quotation=original_quotation)
                if existing_revisions.exists():
                    last_revision_number = existing_revisions.latest("id").quotation_number
                    base_number, revision = last_revision_number.rsplit(".", 1)
                    revision_count = int(revision) + 1
                else:
                    base_number = original_quotation.quotation_number
                    revision_count = 1

                quotation_number = f"{base_number}.{revision_count}"
                lead_id = original_quotation.lead_id 
            except Quotation.DoesNotExist:
                return Response({"error": "Original quotation not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            if not lead_id:
                return Response({"error": "Lead ID is required for new quotations."}, status=status.HTTP_400_BAD_REQUEST)

            current_year = datetime.now().year
            quotation_number = f"QN-{lead_id}-{current_year}"

        try:
            total_amount = sum(item["total"] for item in items)
        except KeyError:
            return Response({"error": "Each item must include a 'total' field."}, status=status.HTTP_400_BAD_REQUEST)

        quotation = Quotation(
            quotation_number=quotation_number,
            lead_id=lead_id,
            items=items,
            total_amount=total_amount,
            discount=discount,
            tax=tax,
            status=quotation_status,
            original_quotation=original_quotation, 
        )
        quotation.save()

        return Response({
            "message": "Quotation created successfully.",
            "quotation_id": quotation.id,
            "quotation_number": quotation.quotation_number,
            "lead_id": lead_id,
            "items": items,
            "total_amount": total_amount,
            "discount": discount,
            "tax": tax,
            "status": quotation_status,
        }, status=status.HTTP_201_CREATED)
