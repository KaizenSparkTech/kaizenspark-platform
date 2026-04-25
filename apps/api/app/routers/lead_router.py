from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.lead_schema import LeadCreate, LeadResponse
from app.services.lead_service import create_lead, get_leads
from app.database.connection import get_db

router = APIRouter(prefix="/leads", tags=["Leads"])

@router.post("/", response_model=LeadResponse)
def create_lead_endpoint(lead_data: LeadCreate, db: Session = Depends(get_db)):
    return create_lead(db, lead_data)

@router.get("/", response_model=list[LeadResponse])
def get_leads_endpoint(db: Session = Depends(get_db)):
    return get_leads(db)