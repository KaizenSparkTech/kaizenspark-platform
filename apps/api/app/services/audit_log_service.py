"""Service layer for AuditLog queries."""

from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog


def get_audit_logs(db: Session, entity_type: str | None = None, entity_id: int | None = None,
                   user_id: int | None = None, limit: int = 100, offset: int = 0):
    query = db.query(AuditLog)
    if entity_type:
        query = query.filter(AuditLog.entity_type == entity_type)
    if entity_id:
        query = query.filter(AuditLog.entity_id == entity_id)
    if user_id:
        query = query.filter(AuditLog.user_id == user_id)
    return query.order_by(AuditLog.created_at.desc()).offset(offset).limit(limit).all()


def create_audit_log(db: Session, user_id: int | None, action: str, entity_type: str,
                     entity_id: int | None = None, old_values: str | None = None,
                     new_values: str | None = None, ip_address: str | None = None,
                     user_agent: str | None = None):
    log = AuditLog(
        user_id=user_id, action=action, entity_type=entity_type,
        entity_id=entity_id, old_values=old_values, new_values=new_values,
        ip_address=ip_address, user_agent=user_agent,
    )
    db.add(log)
    db.commit()
    return log
