"""Schemas for Department CRUD operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DepartmentCreate(BaseModel):
    name: str
    description: Optional[str] = None
    head_id: Optional[int] = None


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    head_id: Optional[int] = None


class DepartmentResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    head_id: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}
