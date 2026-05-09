"""
Audit log middleware — intercepts all mutating HTTP requests (POST/PUT/PATCH/DELETE)
and writes to the audit_logs table.
"""

import json
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.database.connection import SessionLocal
from app.models.audit_log import AuditLog
from app.services.auth_service import decode_access_token


# Map HTTP methods to audit actions
METHOD_ACTION_MAP = {
    "POST": "create",
    "PUT": "update",
    "PATCH": "update",
    "DELETE": "delete",
}

# Routes to skip auditing (high-frequency or non-business)
SKIP_PATHS = {"/docs", "/openapi.json", "/redoc", "/", "/api/v1/auth/login", "/api/v1/notifications/count"}


def _extract_entity_info(path: str) -> tuple[str | None, int | None]:
    """Extract entity_type and entity_id from a path like /api/v1/projects/5."""
    parts = path.strip("/").split("/")
    # Expected: api / v1 / <entity> / [id] / [action]
    if len(parts) >= 3:
        entity_type = parts[2].replace("-", "_")  # e.g. offer-letters → offer_letters
        entity_id = None
        if len(parts) >= 4:
            try:
                entity_id = int(parts[3])
            except ValueError:
                pass
        return entity_type, entity_id
    return None, None


def _extract_user_id(request: Request) -> int | None:
    """Try to extract user_id from JWT in Authorization header."""
    auth = request.headers.get("authorization", "")
    if auth.startswith("Bearer "):
        token = auth[7:]
        payload = decode_access_token(token)
        if payload:
            sub = payload.get("sub")
            if sub:
                return int(sub)
    return None


class AuditLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        method = request.method.upper()

        # Only audit mutating requests
        if method not in METHOD_ACTION_MAP:
            return await call_next(request)

        # Skip non-business paths
        if request.url.path in SKIP_PATHS:
            return await call_next(request)

        action = METHOD_ACTION_MAP[method]
        entity_type, entity_id = _extract_entity_info(request.url.path)
        user_id = _extract_user_id(request)

        # Capture request body for create/update
        new_values = None
        if method in ("POST", "PUT", "PATCH"):
            try:
                body = await request.body()
                if body:
                    new_values = body.decode("utf-8")[:2000]  # Cap at 2KB
            except Exception:
                pass

        response = await call_next(request)

        # Only log if response was successful (2xx)
        if 200 <= response.status_code < 300 and entity_type:
            try:
                db = SessionLocal()
                log = AuditLog(
                    user_id=user_id,
                    action=action,
                    entity_type=entity_type,
                    entity_id=entity_id,
                    new_values=new_values,
                    ip_address=request.client.host if request.client else None,
                    user_agent=request.headers.get("user-agent", "")[:500],
                )
                db.add(log)
                db.commit()
                db.close()
            except Exception:
                pass  # Never let audit logging break the request

        return response
