"""JWT-based authentication service."""

from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.config import get_settings
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.services.user_service import create_user, get_user_by_email, verify_password

settings = get_settings()


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None


def register_user(db: Session, name: str, email: str, password: str, role: str = "client"):
    """Register a new user — only client role allowed for public registration."""
    existing = get_user_by_email(db, email)
    if existing:
        return {"error": "User with this email already exists"}

    # Force client role for public registration
    role = "client"

    user_data = UserCreate(name=name, email=email, password=password, role=role)
    new_user = create_user(db, user_data)
    if not new_user:
        return {"error": "Failed to create user"}

    token = create_access_token({"sub": str(new_user.id), "role": new_user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "status": new_user.status or "active",
            "onboarding_status": new_user.onboarding_status or "none",
            "temp_password_changed": True,
            "is_verified": new_user.is_verified or False,
            "created_at": new_user.created_at.isoformat() if new_user.created_at else None,
        },
    }


def login_user(db: Session, email: str, password: str):
    """Authenticate user and return a JWT token."""
    user = get_user_by_email(db, email)
    if not user:
        return {"error": "Invalid email or password"}

    if not verify_password(password, user.password):
        return {"error": "Invalid email or password"}

    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "status": user.status or "active",
            "onboarding_status": user.onboarding_status or "none",
            "temp_password_changed": user.temp_password_changed if user.temp_password_changed is not None else True,
            "is_verified": user.is_verified or False,
            "personal_email": user.personal_email,
            "created_at": user.created_at.isoformat() if user.created_at else None,
        },
    }
