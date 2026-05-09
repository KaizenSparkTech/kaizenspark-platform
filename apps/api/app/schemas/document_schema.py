from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DocumentCreate(BaseModel):
    project_id: Optional[int] = None
    file_url: str
    uploaded_by: Optional[int] = None


class DocumentResponse(BaseModel):
    id: int
    project_id: Optional[int] = None
    uploaded_by: Optional[int] = None
    file_url: str
    created_at: datetime

    model_config = {"from_attributes": True}