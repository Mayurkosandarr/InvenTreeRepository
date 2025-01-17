# # from django.contrib import admin

# # # Register your models here.
# # from django.contrib import admin
# # from .models import AuditLog

# # class AuditLogAdmin(admin.ModelAdmin):
# #     # List display fields (the columns that will appear in the admin list view)
# #     list_display = ('id', 'entity', 'action', 'request_method', 'response_status', 'user_id', 'ip_address', 'timestamp', 'duration_ms')
    
# #     # Filter options for the admin list view
# #     list_filter = ('entity', 'action', 'response_status', 'timestamp', 'user_id')

# #     # Search functionality (you can search by any of these fields)
# #     search_fields = ('entity', 'action', 'request_url', 'response_status', 'user_id', 'ip_address')

# #     # Date hierarchy (for filtering by date)
# #     date_hierarchy = 'timestamp'

# #     # Fields to display in the detail view of the object
# #     fieldsets = (
# #         (None, {
# #             'fields': ('entity', 'entity_id', 'action', 'request_method', 'request_url', 'request_headers', 'request_payload',
# #                        'response_status', 'response_payload', 'error_message', 'user_id', 'ip_address', 'timestamp', 'duration_ms')
# #         }),
# #     )
    
# #     # Allow ordering of records in the admin list view
# #     ordering = ('-timestamp',)

# # # Register the AuditLog model and its custom admin options
# # admin.site.register(AuditLog, AuditLogAdmin)


# # admin.py
# from django.contrib import admin
# from .models import AuditLog
# from django.db.models import Count

# class AuditLogAdmin(admin.ModelAdmin):
#     list_display = (
#         'timestamp',
#         'action',
#         'entity',
#         'entity_id',
#         'request_method',
#         'request_url',
#         'response_status',
#         'user_id',
#         'ip_address',
#         'duration_ms',
#         'error_message',
#     )
#     list_filter = ('action', 'response_status', 'entity')
#     search_fields = ('request_url', 'action', 'entity', 'error_message')
#     readonly_fields = (
#         'timestamp', 'action', 'entity', 'entity_id', 'request_method',
#         'request_url', 'request_headers', 'request_payload',
#         'response_status', 'response_payload', 'user_id',
#         'ip_address', 'duration_ms', 'error_message',
#     )
#     ordering = ('-timestamp',)

#     # Optional: to display a count of how many logs there are for each entity
#     def get_queryset(self, request):
#         queryset = super().get_queryset(request)
#         queryset = queryset.annotate(entity_count=Count('entity'))
#         return queryset

# admin.site.register(AuditLog, AuditLogAdmin)


from django.contrib import admin
from .models import AuditLog
from django.db.models import Count

class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'action', 'entity', 'entity_id', 'request_method', 
        'request_url', 'response_status', 'timestamp', 'duration_ms', 
        'user_id', 'ip_address', 'error_message'
    )
    list_filter = ('action', 'entity', 'response_status', 'timestamp')
    search_fields = ('action', 'entity', 'request_url', 'user_id')
    ordering = ('-timestamp',)  # Order by timestamp descending
    readonly_fields = ('request_headers', 'request_payload', 'response_payload', 'error_message')

    # You can add annotations to group and display counts, for example:
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.annotate(entity_count=Count('entity'))
        return queryset

    def has_add_permission(self, request):
        # To prevent adding new logs manually, return False
        return False

    def has_change_permission(self, request, obj=None):
        # To prevent changing existing logs, return False
        return False

    def has_delete_permission(self, request, obj=None):
        # You can enable or disable the delete permission as needed
        return False

# Register the admin class with the model
admin.site.register(AuditLog, AuditLogAdmin)
