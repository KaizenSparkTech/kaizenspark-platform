from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    created_at: datetime

    class Config:
        orm_mode = True