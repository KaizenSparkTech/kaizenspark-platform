from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Date, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class InternTask(Base):
    __tablename__ = "intern_tasks"

    id = Column(Integer, primary_key=True, index=True)
    intern_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    github_link = Column(Text, nullable=True)
    submission_date = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(50), default="assigned")  # assigned, submitted, reviewed, completed
    score = Column(Integer, default=0)  # 0-100
    reviewed_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    intern = relationship("User", back_populates="intern_tasks", foreign_keys=[intern_id])
    submissions = relationship("Submission", back_populates="intern_task", cascade="all, delete-orphan")