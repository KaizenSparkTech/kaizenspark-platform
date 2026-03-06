from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.schemas.lead_schema import LeadCreate
from datetime import datetime

def create_lead(db: Session, lead_data: LeadCreate):
    new_lead = Lead(
        name=lead_data.name,
        email=lead_data.email,
        company=lead_data.company,
        status=lead_data.status,
        created_at=datetime.utcnow()
    )
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead

def get_leads(db: Session):
    return db.query(Lead).all()