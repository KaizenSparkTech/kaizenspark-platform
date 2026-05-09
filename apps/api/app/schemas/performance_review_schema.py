"""Schemas for PerformanceReview operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PerformanceReviewCreate(BaseModel):
    employee_id: int
    review_period: str
    rating: Optional[int] = None
    strengths: Optional[str] = None
    areas_of_improvement: Optional[str] = None
    goals: Optional[str] = None


class PerformanceReviewUpdate(BaseModel):
    rating: Optional[int] = None
    strengths: Optional[str] = None
    areas_of_improvement: Optional[str] = None
    goals: Optional[str] = None
    status: Optional[str] = None


class PerformanceReviewResponse(BaseModel):
    id: int
    employee_id: int
    reviewer_id: Optional[int] = None
    review_period: str
    rating: Optional[int] = None
    strengths: Optional[str] = None
    areas_of_improvement: Optional[str] = None
    goals: Optional[str] = None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
