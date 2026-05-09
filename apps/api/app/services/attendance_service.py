"""Service layer for Attendance operations."""

from datetime import datetime, date as date_type, timezone
from decimal import Decimal
from sqlalchemy.orm import Session
from app.models.attendance import Attendance


def check_in(db: Session, user_id: int, notes: str | None = None):
    today = date_type.today()
    existing = db.query(Attendance).filter(
        Attendance.user_id == user_id, Attendance.date == today
    ).first()
    if existing and existing.check_in:
        return None  # Already checked in
    if existing:
        existing.check_in = datetime.now(timezone.utc)
        existing.status = "present"
        if notes:
            existing.notes = notes
        db.commit()
        db.refresh(existing)
        return existing
    record = Attendance(
        user_id=user_id, date=today,
        check_in=datetime.now(timezone.utc),
        status="present", notes=notes,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def check_out(db: Session, user_id: int, notes: str | None = None):
    today = date_type.today()
    record = db.query(Attendance).filter(
        Attendance.user_id == user_id, Attendance.date == today
    ).first()
    if not record or not record.check_in or record.check_out:
        return None
    record.check_out = datetime.now(timezone.utc)
    if record.check_in:
        diff = record.check_out - record.check_in
        record.total_hours = Decimal(str(round(diff.total_seconds() / 3600, 2)))
    if notes:
        record.notes = notes
    db.commit()
    db.refresh(record)
    return record


def get_attendance_history(db: Session, user_id: int, limit: int = 30):
    return db.query(Attendance).filter(
        Attendance.user_id == user_id
    ).order_by(Attendance.date.desc()).limit(limit).all()


def get_team_attendance(db: Session, user_ids: list[int], target_date: date_type | None = None):
    query = db.query(Attendance).filter(Attendance.user_id.in_(user_ids))
    if target_date:
        query = query.filter(Attendance.date == target_date)
    return query.order_by(Attendance.date.desc()).all()
