"""Timesheet model — daily work hour logging per project/task."""

from sqlalchemy import Column, Integer, String, Text, Numeric, Date, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Timesheet(Base):
    __tablename__ = "timesheets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="SET NULL"), nullable=True)
    date = Column(Date, nullable=False)
    hours_worked = Column(Numeric(4, 2), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), default="draft")  # draft, submitted, approved
    approved_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
    project = relationship("Project", foreign_keys=[project_id])
    task = relationship("Task", foreign_keys=[task_id])
    approver = relationship("User", foreign_keys=[approved_by])
