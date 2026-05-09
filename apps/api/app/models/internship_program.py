from sqlalchemy import Column, Integer, String, Text, DateTime, func

from app.database.connection import Base


class InternshipProgram(Base):
    __tablename__ = "internship_programs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())