from pydantic import BaseModel
from typing import Optional

class DocumentCreate(BaseModel):
    name: str
    file_path: str
    description: Optional[str] = None

class DocumentResponse(BaseModel):
    id: int
    name: str
    file_path: str
    description: Optional[str] = None

    class Config:
        orm_mode = True