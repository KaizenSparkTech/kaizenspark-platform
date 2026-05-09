"""Department model — organizational unit."""

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    head_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    head = relationship("User", foreign_keys=[head_id], back_populates="headed_department")
    designations = relationship("Designation", back_populates="department", cascade="all, delete-orphan")
    teams = relationship("Team", back_populates="department", cascade="all, delete-orphan")
    members = relationship("User", foreign_keys="User.department_id", back_populates="department")
