"""Schemas for OfferLetter CRUD operations."""

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime


class OfferLetterCreate(BaseModel):
    candidate_name: str
    candidate_email: EmailStr
    role_offered: str
    department_id: Optional[int] = None
    designation_id: Optional[int] = None
    employment_type: Optional[str] = None
    internship_end_date: Optional[date] = None
    salary_offered: Optional[float] = None
    joining_date: Optional[date] = None
    offer_expiry_date: Optional[date] = None
    letter_content: Optional[str] = None


class OfferLetterUpdate(BaseModel):
    candidate_name: Optional[str] = None
    candidate_email: Optional[str] = None
    role_offered: Optional[str] = None
    department_id: Optional[int] = None
    designation_id: Optional[int] = None
    employment_type: Optional[str] = None
    internship_end_date: Optional[date] = None
    salary_offered: Optional[float] = None
    joining_date: Optional[date] = None
    offer_expiry_date: Optional[date] = None
    letter_content: Optional[str] = None
    status: Optional[str] = None


class OfferLetterAccept(BaseModel):
    signature_text: str  # "I accept the offer"


class OfferLetterResponse(BaseModel):
    id: int
    candidate_name: str
    candidate_email: str
    role_offered: str
    department_id: Optional[int] = None
    designation_id: Optional[int] = None
    employment_type: Optional[str] = None
    internship_end_date: Optional[date] = None
    salary_offered: Optional[float] = None
    joining_date: Optional[date] = None
    offer_expiry_date: Optional[date] = None
    letter_content: Optional[str] = None
    letter_url: Optional[str] = None
    status: str
    sent_by: Optional[int] = None
    accepted_at: Optional[datetime] = None
    signature_text: Optional[str] = None
    generated_user_id: Optional[int] = None
    generated_email: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class SendOfferResponse(BaseModel):
    """Returned when an offer is sent — includes generated credentials (shown once)."""
    offer: OfferLetterResponse
    generated_email: str
    generated_password: str  # plain text, shown to admin once
    message: str
