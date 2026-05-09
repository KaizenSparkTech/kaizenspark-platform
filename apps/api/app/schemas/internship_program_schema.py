from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class InternshipProgramCreate(BaseModel):
    title: str
    description: Optional[str] = None
    duration: Optional[str] = None


class InternshipProgramResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    duration: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}