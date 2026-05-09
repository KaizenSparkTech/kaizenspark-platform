"""Auth router — login only for internal users, register for clients/guests."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserRegister, UserLogin, ChangePassword
from app.services.auth_service import register_user, login_user
from app.services.user_service import change_password
from app.database.connection import get_db
from app.auth_dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    """Public registration — creates a client account only."""
    result = register_user(db, name=user.name, email=user.email, password=user.password, role="client")
    return result


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, email=user.email, password=user.password)
    return result


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "status": current_user.status,
        "onboarding_status": current_user.onboarding_status or "none",
        "temp_password_changed": current_user.temp_password_changed if current_user.temp_password_changed is not None else True,
        "is_verified": current_user.is_verified,
        "personal_email": current_user.personal_email,
        "phone": current_user.phone,
        "address": current_user.address,
        "date_of_birth": current_user.date_of_birth.isoformat() if current_user.date_of_birth else None,
        "github_url": current_user.github_url,
        "linkedin_url": current_user.linkedin_url,
        "emergency_contact_name": current_user.emergency_contact_name,
        "emergency_contact_phone": current_user.emergency_contact_phone,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
    }


@router.post("/change-password")
def do_change_password(data: ChangePassword, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Change password — used for first-time temp password change."""
    result = change_password(db, current_user.id, data.old_password, data.new_password)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
