# from rest_framework.routers import DefaultRouter
# from .api import AuditLogView

# router = DefaultRouter()
# router.register(r'logs', AuditLogView, basename='audit-log')


from django.urls import path
from .api import AuditLogView

urlpatterns = [
    path('logs/', AuditLogView.as_view(), name='audit-log'),
]
