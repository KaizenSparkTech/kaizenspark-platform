"""Schemas for User operations — expanded for enterprise ERP."""

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "employee"
    phone: Optional[str] = None
    department_id: Optional[int] = None
    designation_id: Optional[int] = None
    team_id: Optional[int] = None
    reporting_to: Optional[int] = None
    employee_id: Optional[str] = None
    date_of_joining: Optional[date] = None
    employment_type: Optional[str] = None
    internship_end_date: Optional[date] = None


class UserRegister(BaseModel):
    """Public registration — for client/guest users only."""
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    """Admin/HR can update any user field."""
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    role: Optional[str] = None
    department_id: Optional[int] = None
    designation_id: Optional[int] = None
    team_id: Optional[int] = None
    reporting_to: Optional[int] = None
    employee_id: Optional[str] = None
    date_of_joining: Optional[date] = None
    employment_type: Optional[str] = None
    internship_end_date: Optional[date] = None
    status: Optional[str] = None
    is_verified: Optional[bool] = None
    onboarding_status: Optional[str] = None


class UserOnboardingUpdate(BaseModel):
    """Self-service profile update during onboarding."""
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    date_of_birth: Optional[date] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None


class ChangePassword(BaseModel):
    old_password: str
    new_password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    employee_id: Optional[str] = None
    department_id: Optional[int] = None
    designation_id: Optional[int] = None
    team_id: Optional[int] = None
    reporting_to: Optional[int] = None
    date_of_joining: Optional[date] = None
    employment_type: Optional[str] = None
    internship_end_date: Optional[date] = None
    status: str = "active"
    is_verified: bool = False
    # Personal / onboarding fields
    personal_email: Optional[str] = None
    address: Optional[str] = None
    date_of_birth: Optional[date] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    onboarding_status: str = "none"
    temp_password_changed: bool = True
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse