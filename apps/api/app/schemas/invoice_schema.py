from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InvoiceCreate(BaseModel):
    project_id: int
    amount: float
    status: Optional[str] = "pending"
    issued_date: Optional[datetime] = None

class InvoiceResponse(BaseModel):
    id: int
    project_id: int
    amount: float
    status: str
    issued_date: datetime

    class Config:
        orm_mode = True