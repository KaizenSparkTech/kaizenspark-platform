from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    name: str
    description: Optional[str] = None
    project_id: int
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    project_id: int
    due_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True