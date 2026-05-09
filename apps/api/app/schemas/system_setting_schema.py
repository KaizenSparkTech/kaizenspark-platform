"""Schemas for System Settings."""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SystemSettingCreate(BaseModel):
    key: str
    value: str
    description: Optional[str] = None


class SystemSettingUpdate(BaseModel):
    value: Optional[str] = None
    description: Optional[str] = None


class SystemSettingResponse(BaseModel):
    id: int
    key: str
    value: str
    description: Optional[str] = None
    updated_at: datetime

    model_config = {"from_attributes": True}
