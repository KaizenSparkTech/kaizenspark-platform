from pydantic import BaseModel, EmailStr
from datetime import datetime

class InternApplicationCreate(BaseModel):
    intern_name: str
    email: EmailStr
    program_id: int
    resume_path: str

class InternApplicationResponse(BaseModel):
    id: int
    intern_name: str
    email: EmailStr
    program_id: int
    resume_path: str
    created_at: datetime

    class Config:
        from_attributes = True