from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MilestoneCreate(BaseModel):
    project_id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class MilestoneResponse(BaseModel):
    id: int
    project_id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        orm_mode = True