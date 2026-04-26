from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InternshipProgramCreate(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime

class InternshipProgramResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime

    class Config:
        from_attributes = True