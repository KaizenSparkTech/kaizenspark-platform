"""Team router with RBAC."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.team_schema import TeamCreate, TeamUpdate, TeamResponse
from app.schemas.team_member_schema import TeamMemberCreate, TeamMemberResponse
from app.services.team_service import get_teams, get_team_by_id, create_team, update_team, delete_team
from app.services.team_member_service import get_team_members, add_team_member, remove_team_member
from app.database.connection import get_db
from app.auth_dependencies import require_role
from app.models.user import User

router = APIRouter(prefix="/teams", tags=["Teams"])


@router.get("/", response_model=list[TeamResponse])
def list_teams(department_id: int | None = Query(None), db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager", "project_manager"))):
    return get_teams(db, department_id)


@router.get("/{team_id}", response_model=TeamResponse)
def get_team(team_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager", "project_manager", "team_lead"))):
    team = get_team_by_id(db, team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


@router.post("/", response_model=TeamResponse)
def create_team_endpoint(data: TeamCreate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager"))):
    return create_team(db, data)


@router.put("/{team_id}", response_model=TeamResponse)
def update_team_endpoint(team_id: int, data: TeamUpdate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager"))):
    result = update_team(db, team_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Team not found")
    return result


@router.delete("/{team_id}")
def delete_team_endpoint(team_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin"))):
    if not delete_team(db, team_id):
        raise HTTPException(status_code=404, detail="Team not found")
    return {"message": "Team deleted"}


# --- Team Members ---

@router.get("/{team_id}/members", response_model=list[TeamMemberResponse])
def list_team_members(team_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager", "project_manager", "team_lead"))):
    return get_team_members(db, team_id)


@router.post("/{team_id}/members", response_model=TeamMemberResponse)
def add_member(team_id: int, data: TeamMemberCreate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager", "project_manager"))):
    data.team_id = team_id
    return add_team_member(db, data)


@router.delete("/members/{member_id}")
def remove_member(member_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager"))):
    if not remove_team_member(db, member_id):
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Member removed"}
