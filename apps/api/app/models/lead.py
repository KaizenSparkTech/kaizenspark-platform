from sqlalchemy import Column, Integer, String, Text, DateTime, func

from app.database.connection import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(30), default="pending")  # pending, invited, rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())