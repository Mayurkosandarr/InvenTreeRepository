# # inventree_audit_log/views.py
# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.admin.views.decorators import staff_member_required
# from django.utils.decorators import method_decorator
# from .models import AuditLog
# from .serializers import AuditLogSerializer
# from django.urls import include, path


# # audit_log_api_urls = [
# #     # Base URL for audit log API endpoints
# #     path(
# #         'audit/',
# #         include([
# #             path(
# #                 '<int:pk>/',
# #                 include([
# #                     path(
# #                         'metadata/',
# #                         MetadataView.as_view(),
# #                         {'model': AuditLog},
# #                         name='api-audit-log-metadata',
# #                     ),
# #                     path(
# #                         '',
# #                         AuditLogViewSet.as_view({'get': 'retrieve'}),
# #                         name='api-audit-log-detail',
# #                     ),
# #                 ]),
# #             ),
# #             # Filter parameters can be passed as query params
# #             path(
# #                 'filter/',
# #                 include([
# #                     path(
# #                         'entity/',
# #                         AuditLogViewSet.as_view({'get': 'list'}),
# #                         name='api-audit-log-filter-entity',
# #                     ),
# #                     path(
# #                         'status/',
# #                         AuditLogViewSet.as_view({'get': 'list'}),
# #                         name='api-audit-log-filter-status',
# #                     ),
# #                     path(
# #                         'user/',
# #                         AuditLogViewSet.as_view({'get': 'list'}),
# #                         name='api-audit-log-filter-user',
# #                     ),
# #                 ]),
# #             ),
# #             path('', AuditLogViewSet.as_view({'get': 'list'}), name='api-audit-log-list'),
# #         ]),
# #     ),
# # ]

# @method_decorator(staff_member_required, name='dispatch')
# class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = AuditLog.objects.all()
#     serializer_class = AuditLogSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         queryset = AuditLog.objects.all().order_by('-timestamp')

#         # Apply filters
#         entity = self.request.query_params.get('entity', None)
#         if entity:
#             queryset = queryset.filter(entity=entity)

#         status = self.request.query_params.get('status', None)
#         if status:
#             queryset = queryset.filter(response_status=status)

#         user_id = self.request.query_params.get('user_id', None)
#         if user_id:
#             queryset = queryset.filter(user_id=user_id)

#         return queryset


# # audit_log_api_urls = [
# #     # Endpoint for Audit Log with filters
# #     path(
# #         'logs/',
# #         include([
# #             path(
# #                 '<int:pk>/',
# #                 include([
# #                     path('', AuditLogViewSet.as_view({'get': 'retrieve'}), name='api-audit-log-detail'),
# #                 ]),
# #             ),
# #             path('', AuditLogViewSet.as_view({'get': 'list'}), name='api-audit-log-list'),
# #         ]),
# #     ),
# # ]


# from django.urls import include, path


# audit_log_api_urls = [
#     # Base URL for audit log API endpoints
#     path(
#         'audit/',
#         include([
#             path(
#                 '<int:pk>/',
#                 include([
#                     path(
#                         'metadata/',
#                         MetadataView.as_view(),
#                         {'model': AuditLog},
#                         name='api-audit-log-metadata',
#                     ),
#                     path(
#                         '',
#                         AuditLogViewSet.as_view({'get': 'retrieve'}),
#                         name='api-audit-log-detail',
#                     ),
#                 ]),
#             ),
#             # Filter parameters can be passed as query params
#             path(
#                 'filter/',
#                 include([
#                     path(
#                         'entity/',
#                         AuditLogViewSet.as_view({'get': 'list'}),
#                         name='api-audit-log-filter-entity',
#                     ),
#                     path(
#                         'status/',
#                         AuditLogViewSet.as_view({'get': 'list'}),
#                         name='api-audit-log-filter-status',
#                     ),
#                     path(
#                         'user/',
#                         AuditLogViewSet.as_view({'get': 'list'}),
#                         name='api-audit-log-filter-user',
#                     ),
#                 ]),
#             ),
#             path('', AuditLogViewSet.as_view({'get': 'list'}), name='api-audit-log-list'),
#         ]),
#     ),
# ]


# audit_log/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from audit_log.models import AuditLog  # Make sure you have an AuditLog model
from audit_log.serializers import (
    AuditLogSerializer,
)  # Create this serializer if not present
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.permissions import IsAuthenticated


class AuditLogView(APIView):
    """
    API view to retrieve audit logs.
    """

    # permission_classes = [DjangoModelPermissions]
    permission_classes = [IsAuthenticated]
    queryset = AuditLog.objects.all()  # Define the queryset

    def get(self, request, *args, **kwargs):
        """
        Retrieve a list of all audit logs.
        """
        audit_logs = AuditLog.objects.all()  # Get all audit logs
        serializer = AuditLogSerializer(audit_logs, many=True)  # Serialize the data
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create a new audit log.
        """
        serializer = AuditLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save new audit log
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
