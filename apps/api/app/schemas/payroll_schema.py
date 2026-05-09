"""Schemas for Payroll operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class PayrollCreate(BaseModel):
    user_id: int
    month: int
    year: int
    basic_salary: float = 0
    allowances: float = 0
    deductions: float = 0


class PayrollUpdate(BaseModel):
    basic_salary: Optional[float] = None
    allowances: Optional[float] = None
    deductions: Optional[float] = None
    status: Optional[str] = None
    paid_date: Optional[date] = None


class PayrollResponse(BaseModel):
    id: int
    user_id: int
    month: int
    year: int
    basic_salary: float
    allowances: float
    deductions: float
    net_salary: float
    status: str
    paid_date: Optional[date] = None
    created_at: datetime

    model_config = {"from_attributes": True}
