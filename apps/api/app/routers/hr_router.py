"""Onboarding, Attendance, Leave routers with RBAC."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date

from app.schemas.onboarding_schema import OnboardingChecklistCreate, OnboardingChecklistUpdate, OnboardingChecklistResponse
from app.schemas.attendance_schema import AttendanceCheckIn, AttendanceCheckOut, AttendanceResponse
from app.schemas.leave_schema import LeaveRequestCreate, LeaveRequestUpdate, LeaveRequestResponse, LeaveBalanceResponse
from app.services.onboarding_service import get_checklists_for_user, create_checklist_item, update_checklist_item, delete_checklist_item
from app.services.attendance_service import check_in, check_out, get_attendance_history
from app.services.leave_service import create_leave_request, get_leave_requests, approve_leave, reject_leave, get_leave_balances
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role
from app.models.user import User

# --- Onboarding ---
onboarding_router = APIRouter(prefix="/onboarding", tags=["Onboarding"])


@onboarding_router.get("/", response_model=list[OnboardingChecklistResponse])
def list_checklists(user_id: int | None = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    target_id = user_id if current_user.role in ("super_admin", "hr") else current_user.id
    return get_checklists_for_user(db, target_id)


@onboarding_router.post("/", response_model=OnboardingChecklistResponse)
def create_checklist(data: OnboardingChecklistCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "hr"))):
    return create_checklist_item(db, data, assigned_by=current_user.id)


@onboarding_router.put("/{item_id}", response_model=OnboardingChecklistResponse)
def update_checklist(item_id: int, data: OnboardingChecklistUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    result = update_checklist_item(db, item_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Checklist item not found")
    return result


@onboarding_router.delete("/{item_id}")
def delete_checklist(item_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr"))):
    if not delete_checklist_item(db, item_id):
        raise HTTPException(status_code=404, detail="Checklist item not found")
    return {"message": "Checklist item deleted"}


# --- Attendance ---
attendance_router = APIRouter(prefix="/attendance", tags=["Attendance"])


@attendance_router.post("/check-in", response_model=AttendanceResponse)
def do_check_in(data: AttendanceCheckIn, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = check_in(db, current_user.id, data.notes)
    if not result:
        raise HTTPException(status_code=400, detail="Already checked in today")
    return result


@attendance_router.post("/check-out", response_model=AttendanceResponse)
def do_check_out(data: AttendanceCheckOut, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = check_out(db, current_user.id, data.notes)
    if not result:
        raise HTTPException(status_code=400, detail="No check-in found or already checked out")
    return result


@attendance_router.get("/history", response_model=list[AttendanceResponse])
def attendance_history(user_id: int | None = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    target_id = user_id if current_user.role in ("super_admin", "hr", "manager", "team_lead") and user_id else current_user.id
    return get_attendance_history(db, target_id)


# --- Leave ---
leave_router = APIRouter(prefix="/leaves", tags=["Leave Management"])


@leave_router.post("/request", response_model=LeaveRequestResponse)
def request_leave(data: LeaveRequestCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_leave_request(db, data, current_user.id)


@leave_router.get("/", response_model=list[LeaveRequestResponse])
def list_leaves(user_id: int | None = Query(None), status: str | None = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role in ("super_admin", "hr", "manager", "team_lead"):
        return get_leave_requests(db, user_id=user_id, status=status)
    return get_leave_requests(db, user_id=current_user.id, status=status)


@leave_router.post("/{request_id}/approve", response_model=LeaveRequestResponse)
def approve(request_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "hr", "manager", "team_lead"))):
    result = approve_leave(db, request_id, current_user.id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot approve — request must be pending")
    return result


@leave_router.post("/{request_id}/reject", response_model=LeaveRequestResponse)
def reject(request_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "hr", "manager", "team_lead"))):
    result = reject_leave(db, request_id, current_user.id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot reject — request must be pending")
    return result


@leave_router.get("/balance", response_model=list[LeaveBalanceResponse])
def balance(year: int = Query(default=date.today().year), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_leave_balances(db, current_user.id, year)
