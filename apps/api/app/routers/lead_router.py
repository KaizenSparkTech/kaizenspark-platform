from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.lead_schema import LeadCreate, LeadResponse, LeadInviteResponse
from app.services.lead_service import create_lead, get_leads, invite_lead
from app.database.connection import get_db
from app.auth_dependencies import require_role

router = APIRouter(prefix="/leads", tags=["Leads"])


# Lead creation is PUBLIC (corporate contact form — no auth required)
@router.post("/", response_model=LeadResponse)
def create_lead_endpoint(data: LeadCreate, db: Session = Depends(get_db)):
    return create_lead(db, data)


@router.get("/", response_model=list[LeadResponse])
def list_leads(db: Session = Depends(get_db), _current_user=Depends(require_role("super_admin", "hr"))):
    return get_leads(db)


@router.post("/{lead_id}/invite", response_model=LeadInviteResponse)
def invite_lead_endpoint(lead_id: int, db: Session = Depends(get_db), _current_user=Depends(require_role("super_admin", "hr"))):
    result = invite_lead(db, lead_id)
    if not result:
        raise HTTPException(status_code=404, detail="Lead not found or already processed")
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result