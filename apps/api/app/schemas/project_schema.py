"""Schemas for Project operations — expanded for lifecycle management."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class ProjectCreate(BaseModel):
    client_id: int
    title: str
    description: Optional[str] = None
    status: str = "pending"
    project_request_id: Optional[int] = None
    project_manager_id: Optional[int] = None
    team_id: Optional[int] = None
    budget: Optional[float] = None
    currency: str = "INR"
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    priority: str = "medium"


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    project_manager_id: Optional[int] = None
    team_id: Optional[int] = None
    budget: Optional[float] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    actual_end_date: Optional[date] = None
    priority: Optional[str] = None
    completion_percentage: Optional[int] = None


class ProjectResponse(BaseModel):
    id: int
    client_id: int
    title: str
    description: Optional[str] = None
    status: str
    project_request_id: Optional[int] = None
    project_manager_id: Optional[int] = None
    team_id: Optional[int] = None
    budget: Optional[float] = None
    currency: str = "INR"
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    actual_end_date: Optional[date] = None
    priority: str = "medium"
    completion_percentage: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}