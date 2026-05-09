"""Schemas for Approval operations."""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ApprovalCreate(BaseModel):
    entity_type: str
    entity_id: int
    approver_id: Optional[int] = None


class ApprovalAction(BaseModel):
    status: str  # approved, rejected, escalated
    comments: Optional[str] = None


class ApprovalResponse(BaseModel):
    id: int
    entity_type: str
    entity_id: int
    approver_id: Optional[int] = None
    status: str
    comments: Optional[str] = None
    approved_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}
