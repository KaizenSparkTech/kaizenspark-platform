from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CertificateCreate(BaseModel):
    title: str
    description: Optional[str] = None
    issued_date: Optional[datetime] = None

class CertificateResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    issued_date: datetime

    class Config:
        from_attributes = True