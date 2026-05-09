"""Schemas for Designation CRUD operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DesignationCreate(BaseModel):
    title: str
    level: str = "mid"
    department_id: Optional[int] = None


class DesignationUpdate(BaseModel):
    title: Optional[str] = None
    level: Optional[str] = None
    department_id: Optional[int] = None


class DesignationResponse(BaseModel):
    id: int
    title: str
    level: str
    department_id: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}
