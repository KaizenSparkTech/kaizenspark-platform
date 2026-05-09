from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.schemas.lead_schema import LeadCreate


def create_lead(db: Session, data: LeadCreate) -> Lead:
    lead = Lead(**data.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def get_leads(db: Session) -> list[Lead]:
    return db.query(Lead).order_by(Lead.created_at.desc()).all()


def get_lead_by_id(db: Session, lead_id: int) -> Lead | None:
    return db.query(Lead).filter(Lead.id == lead_id).first()