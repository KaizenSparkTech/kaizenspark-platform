"""Schemas for Task operations — expanded for richer management."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    milestone_id: Optional[int] = None
    project_id: Optional[int] = None
    assigned_to: Optional[int] = None
    status: str = "pending"
    priority: str = "medium"
    deadline: Optional[date] = None
    estimated_hours: Optional[int] = None
    tags: Optional[str] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    milestone_id: Optional[int] = None
    project_id: Optional[int] = None
    assigned_to: Optional[int] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    deadline: Optional[date] = None
    estimated_hours: Optional[int] = None
    actual_hours: Optional[int] = None
    tags: Optional[str] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    milestone_id: Optional[int] = None
    project_id: Optional[int] = None
    assigned_to: Optional[int] = None
    assigned_by: Optional[int] = None
    status: str
    priority: str
    deadline: Optional[date] = None
    estimated_hours: Optional[int] = None
    actual_hours: Optional[int] = None
    tags: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}