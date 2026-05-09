"""Attendance model — daily check-in/check-out tracking."""

from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, DateTime, Numeric, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False)
    check_in = Column(DateTime(timezone=True), nullable=True)
    check_out = Column(DateTime(timezone=True), nullable=True)
    total_hours = Column(Numeric(4, 2), nullable=True)
    status = Column(String(20), default="present")  # present, absent, half_day, on_leave
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
