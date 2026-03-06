from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InternTaskCreate(BaseModel):
    task_name: str
    description: Optional[str] = None
    intern_id: int
    due_date: Optional[datetime] = None

class InternTaskResponse(BaseModel):
    id: int
    task_name: str
    description: Optional[str] = None
    intern_id: int
    due_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        orm_mode = True