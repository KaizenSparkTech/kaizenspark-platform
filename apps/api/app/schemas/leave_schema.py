"""Schemas for LeaveRequest and LeaveBalance operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class LeaveRequestCreate(BaseModel):
    leave_type: str  # casual, sick, earned, maternity, paternity
    start_date: date
    end_date: date
    reason: Optional[str] = None


class LeaveRequestUpdate(BaseModel):
    status: str  # approved, rejected
    # approved_by is set from current_user


class LeaveRequestResponse(BaseModel):
    id: int
    user_id: int
    leave_type: str
    start_date: date
    end_date: date
    reason: Optional[str] = None
    status: str
    approved_by: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class LeaveBalanceResponse(BaseModel):
    id: int
    user_id: int
    leave_type: str
    total_days: int
    used_days: int
    year: int

    model_config = {"from_attributes": True}
