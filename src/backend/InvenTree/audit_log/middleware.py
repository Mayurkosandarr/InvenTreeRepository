# import time
# import json
# from django.conf import settings
# from django.utils import timezone
# import io


# class AuditLogMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         if not getattr(settings, "AUDIT_LOG_ENABLED", True):
#             return self.get_response(request)

#         start_time = time.time()

#         try:
#             # Save the request body content for later without modifying the original 'body' attribute
#             if not hasattr(request, "_body"):
#                 request._body = (
#                     request.body
#                 )  # Store the body in a custom attribute if not already done

#             # Process request
#             response = self.get_response(request)

#             # Create log entry
#             from .models import AuditLog

#             # Extract request payload safely
#             payload = {}
#             if request.content_type == "application/json":
#                 try:
#                     # Read from the stored body content
#                     payload = json.loads(request._body.decode("utf-8"))
#                 except json.JSONDecodeError:
#                     payload = {}
#             else:
#                 payload = request.POST.dict()

#             # Create log entry
#             log_entry = AuditLog(
#                 request_method=request.method,
#                 request_url=request.get_full_path(),
#                 request_headers=json.dumps(dict(request.headers)),
#                 request_payload=json.dumps(payload),
#                 response_status=response.status_code,
#                 response_payload=str(response.content)[:1000],  # Limit response size
#                 user_id=request.user.id if request.user.is_authenticated else None,
#                 ip_address=request.META.get("REMOTE_ADDR"),
#                 duration_ms=int((time.time() - start_time) * 1000),
#             )

#             # Try to extract entity info from URL
#             try:
#                 parts = request.path.strip("/").split("/")
#                 if len(parts) >= 2:
#                     log_entry.entity = parts[0]
#                     if parts[1].isdigit():
#                         log_entry.entity_id = int(parts[1])
#             except:
#                 pass

#             log_entry.save()

#             return response

#         except Exception as e:
#             # Log error but don't break the request
#             print(f"Audit Log Error: {str(e)}")
#             return self.get_response(request)


import time
import json
from django.conf import settings
from django.http import JsonResponse


class AuditLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not getattr(settings, "AUDIT_LOG_ENABLED", True):
            return self.get_response(request)

        start_time = time.time()
        log_entry = None

        try:
            # Save the request body for later usage
            if not hasattr(request, "_body"):
                request._body = request.body  # Store the body in a custom attribute

            # Process request
            response = self.get_response(request)

            # Create log entry
            from .models import AuditLog

            # Extract request payload safely
            payload = {}
            if request.content_type == "application/json":
                try:
                    payload = json.loads(request._body.decode("utf-8"))
                except json.JSONDecodeError:
                    payload = {}
            else:
                payload = request.POST.dict()

            # Create log entry with response details
            log_entry = AuditLog(
                request_method=request.method,
                request_url=request.get_full_path(),
                request_headers=json.dumps(dict(request.headers)),
                request_payload=json.dumps(payload),
                response_status=response.status_code,
                response_payload=str(response.content)[:1000],  # Limit response size
                user_id=request.user.id if request.user.is_authenticated else None,
                ip_address=request.META.get("REMOTE_ADDR"),
                duration_ms=int((time.time() - start_time) * 1000),
            )

            # Extract entity info from URL
            parts = request.path.strip("/").split("/")
            if len(parts) >= 2:
                log_entry.entity = parts[0]
                if parts[1].isdigit():
                    log_entry.entity_id = int(parts[1])

            log_entry.save()
            return response

        except Exception as e:
            # Handle exceptions and save the log entry with error message
            from .models import AuditLog

            if log_entry is None:
                log_entry = AuditLog(
                    request_method=request.method,
                    request_url=request.get_full_path(),
                    request_headers=json.dumps(dict(request.headers)),
                    request_payload=(
                        json.dumps(payload) if "payload" in locals() else "{}"
                    ),
                    response_status=500,
                    response_payload=f"Error: {str(e)}",
                    user_id=request.user.id if request.user.is_authenticated else None,
                    ip_address=request.META.get("REMOTE_ADDR"),
                    duration_ms=int((time.time() - start_time) * 1000),
                )
            else:
                log_entry.response_payload = f"Error: {str(e)}"

            log_entry.save()

            # Log error for debugging (optional)
            print(f"Audit Log Error: {str(e)}")

            # Return a generic error response
            return JsonResponse(
                {"error": "An internal server error occurred."}, status=500
            )
