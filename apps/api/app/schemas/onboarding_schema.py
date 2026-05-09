"""Schemas for OnboardingChecklist operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class OnboardingChecklistCreate(BaseModel):
    user_id: int
    task_title: str
    task_description: Optional[str] = None
    due_date: Optional[date] = None


class OnboardingChecklistUpdate(BaseModel):
    task_title: Optional[str] = None
    task_description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[date] = None


class OnboardingChecklistResponse(BaseModel):
    id: int
    user_id: int
    task_title: str
    task_description: Optional[str] = None
    assigned_by: Optional[int] = None
    status: str
    due_date: Optional[date] = None
    completed_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}
