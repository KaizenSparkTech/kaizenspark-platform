"""Payroll model — monthly salary processing."""

from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Payroll(Base):
    __tablename__ = "payroll"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    month = Column(Integer, nullable=False)  # 1–12
    year = Column(Integer, nullable=False)
    basic_salary = Column(Numeric(12, 2), default=0)
    allowances = Column(Numeric(12, 2), default=0)
    deductions = Column(Numeric(12, 2), default=0)
    net_salary = Column(Numeric(12, 2), default=0)
    status = Column(String(20), default="draft")  # draft, processed, paid
    paid_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
