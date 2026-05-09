"""Schemas for Timesheet operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class TimesheetCreate(BaseModel):
    project_id: Optional[int] = None
    task_id: Optional[int] = None
    date: date
    hours_worked: float
    description: Optional[str] = None


class TimesheetUpdate(BaseModel):
    hours_worked: Optional[float] = None
    description: Optional[str] = None
    status: Optional[str] = None


class TimesheetResponse(BaseModel):
    id: int
    user_id: int
    project_id: Optional[int] = None
    task_id: Optional[int] = None
    date: date
    hours_worked: float
    description: Optional[str] = None
    status: str
    approved_by: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}
