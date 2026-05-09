from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.lead_schema import LeadCreate, LeadResponse
from app.services.lead_service import create_lead, get_leads
from app.database.connection import get_db

router = APIRouter(prefix="/leads", tags=["Leads"])


# Lead creation is PUBLIC (corporate contact form — no auth required)
@router.post("/", response_model=LeadResponse)
def create_lead_endpoint(data: LeadCreate, db: Session = Depends(get_db)):
    return create_lead(db, data)


@router.get("/", response_model=list[LeadResponse])
def list_leads(db: Session = Depends(get_db)):
    # In production, protect this with admin auth
    return get_leads(db)