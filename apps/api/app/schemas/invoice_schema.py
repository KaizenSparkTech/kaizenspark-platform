from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class InvoiceCreate(BaseModel):
    project_id: int
    amount: float
    status: str = "unpaid"
    due_date: Optional[date] = None


class InvoiceUpdate(BaseModel):
    amount: Optional[float] = None
    status: Optional[str] = None
    due_date: Optional[date] = None


class InvoiceResponse(BaseModel):
    id: int
    project_id: int
    amount: float
    status: str
    issued_date: Optional[date] = None
    due_date: Optional[date] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}