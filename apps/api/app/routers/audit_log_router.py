"""AuditLog router — super_admin can view all, HR can view own dept logs."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.schemas.audit_log_schema import AuditLogResponse
from app.services.audit_log_service import get_audit_logs
from app.database.connection import get_db
from app.auth_dependencies import require_role
from app.models.user import User

router = APIRouter(prefix="/audit-logs", tags=["Audit Logs"])


@router.get("/", response_model=list[AuditLogResponse])
def list_audit_logs(
    entity_type: str | None = Query(None),
    entity_id: int | None = Query(None),
    user_id: int | None = Query(None),
    limit: int = Query(100, le=500),
    offset: int = Query(0),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("super_admin", "hr")),
):
    # HR can only see their own audit logs
    if current_user.role == "hr":
        user_id = current_user.id
    return get_audit_logs(db, entity_type=entity_type, entity_id=entity_id,
                          user_id=user_id, limit=limit, offset=offset)
