"""Notification, Timesheet, Performance Review, Payroll routers."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.notification_schema import NotificationResponse
from app.schemas.timesheet_schema import TimesheetCreate, TimesheetUpdate, TimesheetResponse
from app.schemas.performance_review_schema import PerformanceReviewCreate, PerformanceReviewUpdate, PerformanceReviewResponse
from app.schemas.payroll_schema import PayrollCreate, PayrollUpdate, PayrollResponse
from app.services.notification_service import get_notifications, mark_as_read, mark_all_as_read, get_unread_count
from app.services.timesheet_service import create_timesheet, get_timesheets, update_timesheet, approve_timesheet
from app.services.performance_review_service import create_review, get_reviews, update_review
from app.services.payroll_service import create_payroll, get_payroll, update_payroll
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role
from app.models.user import User

# --- Notifications ---
notification_router = APIRouter(prefix="/notifications", tags=["Notifications"])


@notification_router.get("/", response_model=list[NotificationResponse])
def list_notifications(unread_only: bool = Query(False), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_notifications(db, current_user.id, unread_only)


@notification_router.get("/count")
def unread_count(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return {"unread_count": get_unread_count(db, current_user.id)}


@notification_router.put("/{notification_id}/read", response_model=NotificationResponse)
def read_notification(notification_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = mark_as_read(db, notification_id, current_user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Notification not found")
    return result


@notification_router.post("/read-all")
def read_all(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    mark_all_as_read(db, current_user.id)
    return {"message": "All notifications marked as read"}


# --- Timesheets ---
timesheet_router = APIRouter(prefix="/timesheets", tags=["Timesheets"])


@timesheet_router.post("/", response_model=TimesheetResponse)
def create_entry(data: TimesheetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_timesheet(db, data, current_user.id)


@timesheet_router.get("/", response_model=list[TimesheetResponse])
def list_timesheets(user_id: int | None = Query(None), project_id: int | None = Query(None),
                    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role in ("super_admin", "manager", "project_manager", "team_lead"):
        return get_timesheets(db, user_id=user_id, project_id=project_id)
    return get_timesheets(db, user_id=current_user.id, project_id=project_id)


@timesheet_router.put("/{entry_id}", response_model=TimesheetResponse)
def update_entry(entry_id: int, data: TimesheetUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    result = update_timesheet(db, entry_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Timesheet entry not found")
    return result


@timesheet_router.post("/{entry_id}/approve", response_model=TimesheetResponse)
def approve_entry(entry_id: int, db: Session = Depends(get_db),
                  current_user: User = Depends(require_role("super_admin", "manager", "project_manager", "team_lead"))):
    result = approve_timesheet(db, entry_id, current_user.id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot approve")
    return result


# --- Performance Reviews ---
review_router = APIRouter(prefix="/performance-reviews", tags=["Performance Reviews"])


@review_router.post("/", response_model=PerformanceReviewResponse)
def create_perf_review(data: PerformanceReviewCreate, db: Session = Depends(get_db),
                       current_user: User = Depends(require_role("super_admin", "hr", "manager", "project_manager", "team_lead"))):
    return create_review(db, data, current_user.id)


@review_router.get("/", response_model=list[PerformanceReviewResponse])
def list_reviews(employee_id: int | None = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role in ("super_admin", "hr", "manager", "project_manager", "team_lead"):
        return get_reviews(db, employee_id=employee_id)
    return get_reviews(db, employee_id=current_user.id)


@review_router.put("/{review_id}", response_model=PerformanceReviewResponse)
def update_perf_review(review_id: int, data: PerformanceReviewUpdate, db: Session = Depends(get_db),
                       _: User = Depends(require_role("super_admin", "hr", "manager", "project_manager", "team_lead"))):
    result = update_review(db, review_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Review not found")
    return result


# --- Payroll ---
payroll_router = APIRouter(prefix="/payroll", tags=["Payroll"])


@payroll_router.post("/", response_model=PayrollResponse)
def create_payroll_entry(data: PayrollCreate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "finance"))):
    return create_payroll(db, data)


@payroll_router.get("/", response_model=list[PayrollResponse])
def list_payroll(user_id: int | None = Query(None), month: int | None = Query(None),
                 year: int | None = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role in ("super_admin", "finance", "hr"):
        return get_payroll(db, user_id=user_id, month=month, year=year)
    return get_payroll(db, user_id=current_user.id, month=month, year=year)


@payroll_router.put("/{payroll_id}", response_model=PayrollResponse)
def update_payroll_entry(payroll_id: int, data: PayrollUpdate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "finance"))):
    result = update_payroll(db, payroll_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Payroll entry not found")
    return result
