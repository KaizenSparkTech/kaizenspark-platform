from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class InternTaskCreate(BaseModel):
    intern_id: int
    title: str
    description: Optional[str] = None


class InternTaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    github_link: Optional[str] = None
    status: Optional[str] = None
    score: Optional[int] = None
    reviewed_by: Optional[int] = None


class InternTaskResponse(BaseModel):
    id: int
    intern_id: int
    title: str
    description: Optional[str] = None
    github_link: Optional[str] = None
    submission_date: Optional[datetime] = None
    status: str
    score: int
    reviewed_by: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}