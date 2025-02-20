from django.urls import path
from .views import CreateLeadView, CreateQuotationView, CreateInvoiceView, LeadToInvoiceView, NotificationAPI, NumberingSystemSettingsAPI,CreateRevisedQuotationAPI,PartAPIView

urlpatterns = [
    path('leads/', CreateLeadView.as_view(), name='create-lead-api'), 
    path('quotations/', CreateQuotationView.as_view(), name='create-quotation-api'),
    path('invoices/', CreateInvoiceView.as_view(), name='create-invoice-api'),
    path('parts/', PartAPIView.as_view(), name='part-list'),
    path('lead-to-invoice/', LeadToInvoiceView.as_view(), name='lead-to-invoice-api'),
    path('notifications/', NotificationAPI.as_view(), name='notification-api'), 
    path('numbering-system/', NumberingSystemSettingsAPI.as_view(), name='numbering-system-api'),  
    path('quotations/<int:quotation_id>/revise/', CreateRevisedQuotationAPI.as_view(), name='create-revised-quotation-api'),

]
  