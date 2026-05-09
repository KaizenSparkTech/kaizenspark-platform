"""Schemas for Attendance operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class AttendanceCheckIn(BaseModel):
    notes: Optional[str] = None


class AttendanceCheckOut(BaseModel):
    notes: Optional[str] = None


class AttendanceResponse(BaseModel):
    id: int
    user_id: int
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    total_hours: Optional[float] = None
    status: str
    notes: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
