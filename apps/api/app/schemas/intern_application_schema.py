from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class InternApplicationCreate(BaseModel):
    user_id: int
    program_id: int


class InternApplicationUpdate(BaseModel):
    status: str  # pending, approved, rejected


class InternApplicationResponse(BaseModel):
    id: int
    user_id: int
    program_id: int
    status: str
    applied_at: datetime

    model_config = {"from_attributes": True}