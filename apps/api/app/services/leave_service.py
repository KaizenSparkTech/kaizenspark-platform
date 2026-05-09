"""Service layer for LeaveRequest and LeaveBalance operations."""

from sqlalchemy.orm import Session
from app.models.leave_request import LeaveRequest
from app.models.leave_balance import LeaveBalance
from app.schemas.leave_schema import LeaveRequestCreate


def create_leave_request(db: Session, data: LeaveRequestCreate, user_id: int):
    request = LeaveRequest(**data.model_dump(), user_id=user_id)
    db.add(request)
    db.commit()
    db.refresh(request)
    return request


def get_leave_requests(db: Session, user_id: int | None = None, status: str | None = None):
    query = db.query(LeaveRequest)
    if user_id:
        query = query.filter(LeaveRequest.user_id == user_id)
    if status:
        query = query.filter(LeaveRequest.status == status)
    return query.order_by(LeaveRequest.created_at.desc()).all()


def approve_leave(db: Session, request_id: int, approver_id: int):
    request = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    if not request or request.status != "pending":
        return None
    request.status = "approved"
    request.approved_by = approver_id
    # Update leave balance
    days = (request.end_date - request.start_date).days + 1
    balance = db.query(LeaveBalance).filter(
        LeaveBalance.user_id == request.user_id,
        LeaveBalance.leave_type == request.leave_type,
        LeaveBalance.year == request.start_date.year,
    ).first()
    if balance:
        balance.used_days += days
    db.commit()
    db.refresh(request)
    return request


def reject_leave(db: Session, request_id: int, approver_id: int):
    request = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    if not request or request.status != "pending":
        return None
    request.status = "rejected"
    request.approved_by = approver_id
    db.commit()
    db.refresh(request)
    return request


def get_leave_balances(db: Session, user_id: int, year: int):
    return db.query(LeaveBalance).filter(
        LeaveBalance.user_id == user_id, LeaveBalance.year == year
    ).all()
