"""Service layer for TeamMember operations."""

from sqlalchemy.orm import Session
from app.models.team_member import TeamMember
from app.schemas.team_member_schema import TeamMemberCreate


def get_team_members(db: Session, team_id: int):
    return db.query(TeamMember).filter(TeamMember.team_id == team_id).all()


def add_team_member(db: Session, data: TeamMemberCreate):
    member = TeamMember(**data.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


def remove_team_member(db: Session, member_id: int) -> bool:
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        return False
    db.delete(member)
    db.commit()
    return True
