from django.contrib import admin
from .models import NumberingSystemSettings

@admin.register(NumberingSystemSettings)
class NumberingSystemSettingsAdmin(admin.ModelAdmin):
    # Fields to be displayed in the list view
    list_display = ('type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle')

    # Adding filters to make it easier to search
    list_filter = ('type',)

    # Adding search functionality based on type or other fields
    search_fields = ('type', 'prefix', 'suffix')

    # Adding editable fields directly in the list view
    list_editable = ('prefix', 'suffix', 'increment_step', 'reset_cycle')

    # Optionally, you can add fieldsets to organize fields in the form view
    fieldsets = (
        (None, {
            'fields': ('type', 'prefix', 'suffix', 'current_number', 'increment_step', 'reset_cycle')
        }),
    )

    # Make the model's fields sortable in the admin interface
    ordering = ('type',)
