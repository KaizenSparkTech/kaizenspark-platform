"""Schemas for TeamMember operations."""

from pydantic import BaseModel
from datetime import datetime


class TeamMemberCreate(BaseModel):
    team_id: int
    user_id: int
    role_in_team: str = "member"


class TeamMemberResponse(BaseModel):
    id: int
    team_id: int
    user_id: int
    role_in_team: str
    joined_at: datetime

    model_config = {"from_attributes": True}
