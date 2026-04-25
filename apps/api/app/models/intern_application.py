from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from datetime import datetime
from app.database.connection import Base


class InternApplication(Base):
    __tablename__ = "intern_applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    program_id = Column(Integer, ForeignKey("internship_programs.id"))
    status = Column(String)
    applied_at = Column(DateTime, default=datetime.utcnow)