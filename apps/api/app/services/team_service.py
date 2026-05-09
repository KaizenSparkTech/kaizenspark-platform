"""Service layer for Team CRUD operations."""

from sqlalchemy.orm import Session
from app.models.team import Team
from app.schemas.team_schema import TeamCreate, TeamUpdate


def get_teams(db: Session, department_id: int | None = None):
    query = db.query(Team)
    if department_id:
        query = query.filter(Team.department_id == department_id)
    return query.all()


def get_team_by_id(db: Session, team_id: int):
    return db.query(Team).filter(Team.id == team_id).first()


def create_team(db: Session, data: TeamCreate):
    team = Team(**data.model_dump())
    db.add(team)
    db.commit()
    db.refresh(team)
    return team


def update_team(db: Session, team_id: int, data: TeamUpdate):
    team = get_team_by_id(db, team_id)
    if not team:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(team, key, value)
    db.commit()
    db.refresh(team)
    return team


def delete_team(db: Session, team_id: int) -> bool:
    team = get_team_by_id(db, team_id)
    if not team:
        return False
    db.delete(team)
    db.commit()
    return True
