"""OfferLetter model — HR digital offer letter with e-signing."""

from sqlalchemy import Column, Integer, String, Text, Numeric, Date, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class OfferLetter(Base):
    __tablename__ = "offer_letters"

    id = Column(Integer, primary_key=True, index=True)
    candidate_name = Column(String(100), nullable=False)
    candidate_email = Column(String(100), nullable=False)
    role_offered = Column(String(50), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    designation_id = Column(Integer, ForeignKey("designations.id", ondelete="SET NULL"), nullable=True)
    salary_offered = Column(Numeric(12, 2), nullable=True)
    joining_date = Column(Date, nullable=True)
    offer_expiry_date = Column(Date, nullable=True)
    letter_content = Column(Text, nullable=True)  # HTML/Markdown template
    letter_url = Column(String(500), nullable=True)  # Generated PDF URL
    status = Column(String(20), default="draft")  # draft, sent, accepted, rejected, expired
    sent_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    accepted_at = Column(DateTime(timezone=True), nullable=True)
    signature_text = Column(String(200), nullable=True)  # E-signature text
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    sender = relationship("User", foreign_keys=[sent_by])
    department = relationship("Department", foreign_keys=[department_id])
    designation = relationship("Designation", foreign_keys=[designation_id])
