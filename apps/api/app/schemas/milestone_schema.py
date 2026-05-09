from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class MilestoneCreate(BaseModel):
    project_id: int
    title: str
    description: Optional[str] = None
    progress: int = 0
    deadline: Optional[date] = None


class MilestoneUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    progress: Optional[int] = None
    deadline: Optional[date] = None


class MilestoneResponse(BaseModel):
    id: int
    project_id: int
    title: str
    description: Optional[str] = None
    progress: int
    deadline: Optional[date] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}