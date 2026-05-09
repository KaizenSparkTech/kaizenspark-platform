"""Schemas for ProjectRequest operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class ProjectRequestCreate(BaseModel):
    title: str
    description: Optional[str] = None
    requirements_doc_url: Optional[str] = None
    proposed_budget: Optional[float] = None
    currency: str = "INR"
    expected_deadline: Optional[date] = None
    priority: str = "medium"


class ProjectRequestReview(BaseModel):
    status: str  # under_review, approved, rejected
    rejection_reason: Optional[str] = None


class ProjectRequestResponse(BaseModel):
    id: int
    client_id: int
    title: str
    description: Optional[str] = None
    requirements_doc_url: Optional[str] = None
    proposed_budget: Optional[float] = None
    currency: str
    expected_deadline: Optional[date] = None
    priority: str
    status: str
    reviewed_by: Optional[int] = None
    approved_by: Optional[int] = None
    rejection_reason: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
