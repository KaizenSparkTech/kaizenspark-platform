from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubmissionCreate(BaseModel):
    intern_id: int
    task_id: int
    file_path: str
    remarks: Optional[str] = None

class SubmissionResponse(BaseModel):
    id: int
    intern_id: int
    task_id: int
    file_path: str
    remarks: Optional[str] = None
    submitted_at: datetime

    class Config:
        from_attributes = True