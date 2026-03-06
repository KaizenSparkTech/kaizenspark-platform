from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.milestone_schema import MilestoneCreate, MilestoneResponse
from app.services.milestone_service import create_milestone, get_milestones
from app.database.connection import get_db

router = APIRouter(prefix="/milestones", tags=["Milestones"])

@router.post("/", response_model=MilestoneResponse)
def create_milestone_endpoint(ms_data: MilestoneCreate, db: Session = Depends(get_db)):
    return create_milestone(db, ms_data)

@router.get("/", response_model=list[MilestoneResponse])
def get_milestones_endpoint(db: Session = Depends(get_db)):
    return get_milestones(db)