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
    list_display = ('id', 'lead', 'quotation_number', 'total', 'status', 'created_at')  # Use 'total' instead of 'total_amount'
    search_fields = ('quotation_number', 'lead__name', 'status')
    list_filter = ('status', 'lead')
    ordering = ('-created_at',)
    list_editable = ('status',)

    # Display 'quotation_number' as a method (if it's not directly a field)
    def quotation_number(self, obj):
        return obj.quotation_number  # Ensure this is a valid field or method

    # Display 'total' as a method (if it's not directly a field)
    def total(self, obj):
        return obj.total_amount
        
          # Use 'total' field from the model

    class RevisionInline(admin.TabularInline):
        model = Quotation
        readonly_fields = ['quotation_number', 'total_amount']  # Use correct field names: 'quotation_number' and 'total'
        extra = 0  # No extra empty rows

    inlines = [RevisionInline]

    
# @admin.register(Quotation)
# class QuotationAdmin(admin.ModelAdmin):
#     list_display = ('id', 'lead', 'quotation_number', 'original_quotation', 'total_amount', 'status', 'created_at')
#     search_fields = ('quotation_number', 'lead__name', 'status')
#     list_filter = ('status', 'lead')
#     ordering = ('-created_at',)
#     list_editable = ('status',)
    
#     # Adding display for revisions
#     def original_quotation(self, obj):
#         """
#         Display the original quotation (if it exists) in the admin panel.
#         """
#         return obj.original_quotation.quotation_number if obj.original_quotation else None
#     original_quotation.short_description = 'Original Quotation'

#     # Adding a link to revisions
#     def get_queryset(self, request):
#         """
#         Customize the queryset to prefetch related data for better performance.
#         """
#         queryset = super().get_queryset(request)
#         return queryset.select_related('original_quotation', 'lead')

#     # Adding readonly fields for auto-generated data
#     readonly_fields = ('quotation_number', 'created_at', 'updated_at')

    # Inline view for revisions (optional)
    class RevisionInline(admin.TabularInline):
        model = Quotation
        fk_name = 'original_quotation'
        fields = ('quotation_number', 'total_amount', 'status', 'created_at')
        readonly_fields = fields
        extra = 0
        can_delete = False

    inlines = [RevisionInline]  # Show revisions inline


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
