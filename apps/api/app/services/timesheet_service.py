"""Service layer for Timesheet operations."""

from sqlalchemy.orm import Session
from app.models.timesheet import Timesheet
from app.schemas.timesheet_schema import TimesheetCreate, TimesheetUpdate


def create_timesheet(db: Session, data: TimesheetCreate, user_id: int):
    entry = Timesheet(**data.model_dump(), user_id=user_id)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def get_timesheets(db: Session, user_id: int | None = None, project_id: int | None = None,
                   status: str | None = None):
    query = db.query(Timesheet)
    if user_id:
        query = query.filter(Timesheet.user_id == user_id)
    if project_id:
        query = query.filter(Timesheet.project_id == project_id)
    if status:
        query = query.filter(Timesheet.status == status)
    return query.order_by(Timesheet.date.desc()).all()


def update_timesheet(db: Session, entry_id: int, data: TimesheetUpdate):
    entry = db.query(Timesheet).filter(Timesheet.id == entry_id).first()
    if not entry:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(entry, key, value)
    db.commit()
    db.refresh(entry)
    return entry


def approve_timesheet(db: Session, entry_id: int, approver_id: int):
    entry = db.query(Timesheet).filter(Timesheet.id == entry_id).first()
    if not entry or entry.status != "submitted":
        return None
    entry.status = "approved"
    entry.approved_by = approver_id
    db.commit()
    db.refresh(entry)
    return entry
