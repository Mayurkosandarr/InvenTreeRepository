# from django.contrib import admin
# from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification

# # Registering Lead model
# @admin.register(Lead)
# class LeadAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'email', 'phone', 'status', 'created_at', 'updated_at')
#     search_fields = ('name', 'email', 'phone', 'status')
#     list_filter = ('status',)
#     ordering = ('-created_at',)
#     list_editable = ('status',)
    
# # Registering Quotation model
# @admin.register(Quotation)
# class QuotationAdmin(admin.ModelAdmin):
#     list_display = ('id', 'lead', 'quotation_number', 'total_amount', 'status', 'created_at')
#     search_fields = ('quotation_number', 'lead__name', 'status')
#     list_filter = ('status', 'lead')
#     ordering = ('-created_at',)
#     list_editable = ('status',)

# # Registering Invoice model
# @admin.register(Invoice)
# class InvoiceAdmin(admin.ModelAdmin):
#     list_display = ('id', 'quotation', 'invoice_number', 'amount_due', 'status', 'created_at')
#     search_fields = ('invoice_number', 'quotation__quotation_number', 'status')
#     list_filter = ('status', 'quotation')
#     ordering = ('-created_at',)
#     list_editable = ('status',)

# # Registering NumberingSystemSettings model
# @admin.register(NumberingSystemSettings)
# class NumberingSystemSettingsAdmin(admin.ModelAdmin):
#     list_display = ('type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle')
#     list_filter = ('type',)
#     search_fields = ('type', 'prefix', 'suffix')
#     list_editable = ('prefix', 'suffix', 'increment_step', 'reset_cycle')
#     fieldsets = (
#         (None, {
#             'fields': ('type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle')
#         }),
#     )
#     ordering = ('type',)



# @admin.register(Notification)
# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ('type', 'recipient', 'status', 'timestamp', 'lead', 'quotation', 'invoice')
#     list_filter = ('type', 'status', 'timestamp')
#     search_fields = ('recipient', 'message')


from django.contrib import admin
from .models import Lead, Quotation, Invoice, NumberingSystemSettings, Notification

# Inline for Quotation and Invoice models within Lead admin
class QuotationInline(admin.TabularInline):
    model = Quotation
    extra = 0

class InvoiceInline(admin.TabularInline):
    model = Invoice
    extra = 0

# Registering Lead model
@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'status', 'created_at', 'updated_at')
    search_fields = ('name', 'email', 'phone', 'status')
    list_filter = ('status',)
    ordering = ('-created_at',)
    list_editable = ('status',)
    inlines = [QuotationInline, InvoiceInline]  # Inline for related quotations and invoices

# Registering Quotation model
@admin.register(Quotation)
class QuotationAdmin(admin.ModelAdmin):
    list_display = ('id', 'lead', 'quotation_number', 'total_amount', 'status', 'created_at')
    search_fields = ('quotation_number', 'lead__name', 'status')
    list_filter = ('status', 'lead')
    ordering = ('-created_at',)
    list_editable = ('status',)

# Registering Invoice model
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'quotation', 'invoice_number', 'amount_due', 'status', 'created_at')
    search_fields = ('invoice_number', 'quotation__quotation_number', 'status')
    list_filter = ('status', 'quotation')
    ordering = ('-created_at',)
    list_editable = ('status',)

# Registering NumberingSystemSettings model
@admin.register(NumberingSystemSettings)
class NumberingSystemSettingsAdmin(admin.ModelAdmin):
    list_display = ('type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle')
    list_filter = ('type',)
    search_fields = ('type', 'prefix', 'suffix')
    list_editable = ('prefix', 'suffix', 'increment_step', 'reset_cycle')
    fieldsets = (
        (None, {
            'fields': ('type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle')
        }),
    )
    ordering = ('type',)

# Registering Notification model
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('type', 'recipient', 'status', 'timestamp', 'lead', 'quotation', 'invoice')
    list_filter = ('type', 'status', 'timestamp')
    search_fields = ('recipient', 'message')
