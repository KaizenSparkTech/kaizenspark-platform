"""Approval router — generic approval chain."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.approval_schema import ApprovalCreate, ApprovalAction, ApprovalResponse
from app.services.approval_service import create_approval, get_approvals, process_approval
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role
from app.models.user import User

router = APIRouter(prefix="/approvals", tags=["Approvals"])


@router.get("/", response_model=list[ApprovalResponse])
def list_approvals(entity_type: str | None = Query(None), status: str | None = Query(None),
                   db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == "super_admin":
        return get_approvals(db, entity_type=entity_type, status=status)
    return get_approvals(db, entity_type=entity_type, approver_id=current_user.id, status=status)


@router.post("/", response_model=ApprovalResponse)
def create_approval_endpoint(data: ApprovalCreate, db: Session = Depends(get_db),
                              _: User = Depends(require_role("super_admin", "manager", "hr", "business_analyst"))):
    return create_approval(db, data)


@router.put("/{approval_id}", response_model=ApprovalResponse)
def process(approval_id: int, data: ApprovalAction, db: Session = Depends(get_db),
            current_user: User = Depends(require_role("super_admin", "manager", "hr", "business_analyst", "team_lead"))):
    result = process_approval(db, approval_id, data, current_user.id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot process — approval must be pending")
    return result
