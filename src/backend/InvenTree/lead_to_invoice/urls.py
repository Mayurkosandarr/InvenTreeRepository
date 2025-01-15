from django.urls import path
from .views import CreateLeadView, CreateQuotationView, CreateInvoiceView, LeadToInvoiceView, NotificationAPI, NumberingSystemSettingsAPI

urlpatterns = [
    path('leads/', CreateLeadView.as_view(), name='create-lead-api'),  # Create lead view
    path('quotations/', CreateQuotationView.as_view(), name='create-quotation-api'),  # Create quotation view
    path('invoices/', CreateInvoiceView.as_view(), name='create-invoice-api'),  # Create invoice view
    path('lead-to-invoice/', LeadToInvoiceView.as_view(), name='lead-to-invoice-api'),  # Lead to invoice view
    path('notifications/', NotificationAPI.as_view(), name='notification-api'),  # Notification view
    path('numbering-system/', NumberingSystemSettingsAPI.as_view(), name='numbering-system-api'),  # Numbering system settings API
]
