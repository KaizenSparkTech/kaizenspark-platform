from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.milestone_schema import MilestoneCreate, MilestoneUpdate, MilestoneResponse
from app.services.milestone_service import create_milestone, get_milestones, get_milestone_by_id, update_milestone, delete_milestone
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/milestones", tags=["Milestones"])


@router.get("/", response_model=list[MilestoneResponse])
def list_milestones(project_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_milestones(db, project_id=project_id)


@router.get("/{milestone_id}", response_model=MilestoneResponse)
def get_milestone(milestone_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    m = get_milestone_by_id(db, milestone_id)
    if not m:
        raise HTTPException(status_code=404, detail="Milestone not found")
    return m


@router.post("/", response_model=MilestoneResponse)
def create_milestone_endpoint(data: MilestoneCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_milestone(db, data)


@router.put("/{milestone_id}", response_model=MilestoneResponse)
def update_milestone_endpoint(milestone_id: int, data: MilestoneUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    m = update_milestone(db, milestone_id, data)
    if not m:
        raise HTTPException(status_code=404, detail="Milestone not found")
    return m


@router.delete("/{milestone_id}")
def delete_milestone_endpoint(milestone_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    if not delete_milestone(db, milestone_id):
        raise HTTPException(status_code=404, detail="Milestone not found")
    return {"message": "Milestone deleted"}