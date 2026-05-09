from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime, Date, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    status = Column(String(50), default="unpaid")  # unpaid, paid, overdue
    issued_date = Column(Date, server_default=func.current_date())
    due_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    project = relationship("Project", back_populates="invoices")