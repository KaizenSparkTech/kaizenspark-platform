from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from app.database.connection import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    intern_id = Column(Integer, ForeignKey("users.id"))
    program_id = Column(Integer, ForeignKey("internship_programs.id"))
    certificate_id = Column(String)
    issued_at = Column(DateTime, default=datetime.utcnow)