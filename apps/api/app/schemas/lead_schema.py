from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class LeadResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    message: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class LeadInviteResponse(BaseModel):
    lead: LeadResponse
    generated_email: str
    generated_password: str
    message: str