"""User router with proper RBAC — super_admin/hr manage users."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate, UserResponse, UserUpdate, UserOnboardingUpdate
from app.services.user_service import create_user, get_users, get_user_by_id, update_user, update_user_profile, approve_onboarding
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=list[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    _current_user=Depends(require_role("super_admin", "hr")),
):
    return get_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    _current_user=Depends(get_current_user),
):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=UserResponse)
def create_user_endpoint(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    _current_user=Depends(require_role("super_admin", "hr")),
):
    user = create_user(db, user_data)
    if not user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    return user


@router.put("/me/profile", response_model=UserResponse)
def update_my_profile(
    data: UserOnboardingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Self-service profile update — used during onboarding."""
    result = update_user_profile(db, current_user.id, data)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result


@router.put("/{user_id}", response_model=UserResponse)
def update_user_endpoint(
    user_id: int,
    data: UserUpdate,
    db: Session = Depends(get_db),
    _current_user=Depends(require_role("super_admin", "hr")),
):
    """Admin/HR can update any user."""
    result = update_user(db, user_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result


@router.post("/{user_id}/approve-onboarding", response_model=UserResponse)
def approve_user_onboarding(
    user_id: int,
    db: Session = Depends(get_db),
    _current_user=Depends(require_role("super_admin", "hr")),
):
    """Approve a user's onboarding — sets them to active and verified."""
    result = approve_onboarding(db, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result