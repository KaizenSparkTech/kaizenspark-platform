"""Schemas for Team CRUD operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TeamCreate(BaseModel):
    name: str
    description: Optional[str] = None
    department_id: Optional[int] = None
    lead_id: Optional[int] = None


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    department_id: Optional[int] = None
    lead_id: Optional[int] = None


class TeamResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    department_id: Optional[int] = None
    lead_id: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}
