from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.connection import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    company = Column(String)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)