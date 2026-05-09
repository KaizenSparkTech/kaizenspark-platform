"""Service layer for Approval operations."""

from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.approval import Approval
from app.schemas.approval_schema import ApprovalCreate, ApprovalAction


def create_approval(db: Session, data: ApprovalCreate):
    approval = Approval(**data.model_dump())
    db.add(approval)
    db.commit()
    db.refresh(approval)
    return approval


def get_approvals(db: Session, entity_type: str | None = None, approver_id: int | None = None,
                  status: str | None = None):
    query = db.query(Approval)
    if entity_type:
        query = query.filter(Approval.entity_type == entity_type)
    if approver_id:
        query = query.filter(Approval.approver_id == approver_id)
    if status:
        query = query.filter(Approval.status == status)
    return query.order_by(Approval.created_at.desc()).all()


def process_approval(db: Session, approval_id: int, data: ApprovalAction, approver_id: int):
    approval = db.query(Approval).filter(Approval.id == approval_id).first()
    if not approval or approval.status != "pending":
        return None
    approval.status = data.status
    approval.comments = data.comments
    approval.approver_id = approver_id
    if data.status == "approved":
        approval.approved_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(approval)
    return approval
