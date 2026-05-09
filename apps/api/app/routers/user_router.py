from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate, UserResponse
from app.services.user_service import create_user, get_users, get_user_by_id
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=list[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    _current_user=Depends(require_role("admin")),
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
    _current_user=Depends(require_role("admin")),
):
    user = create_user(db, user_data)
    if not user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    return user