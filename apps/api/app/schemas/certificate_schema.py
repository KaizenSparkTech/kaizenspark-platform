from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class CertificateCreate(BaseModel):
    intern_id: int
    title: str
    certificate_url: Optional[str] = None


class CertificateResponse(BaseModel):
    id: int
    intern_id: int
    title: str
    certificate_url: Optional[str] = None
    issued_date: Optional[date] = None
    created_at: datetime

    model_config = {"from_attributes": True}