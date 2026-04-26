from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    status: Optional[str] = "new"

class LeadResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    company: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True