from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SubmissionCreate(BaseModel):
    intern_task_id: int
    github_link: str


class SubmissionUpdate(BaseModel):
    reviewed: Optional[bool] = None
    feedback: Optional[str] = None


class SubmissionResponse(BaseModel):
    id: int
    intern_task_id: int
    github_link: str
    submitted_at: Optional[datetime] = None
    reviewed: bool
    feedback: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}