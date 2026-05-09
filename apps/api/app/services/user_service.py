import bcrypt
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate, UserOnboardingUpdate


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_user(db: Session, user_data: UserCreate) -> User | None:
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        return None
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        role=user_data.role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_users(db: Session) -> list[User]:
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def update_user(db: Session, user_id: int, data: UserUpdate) -> User | None:
    """Admin/HR can update any user's fields."""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


def update_user_profile(db: Session, user_id: int, data: UserOnboardingUpdate) -> User | None:
    """Self-service profile update during onboarding."""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    # Move onboarding status forward if still pending
    if user.onboarding_status == "pending":
        user.onboarding_status = "in_progress"
    db.commit()
    db.refresh(user)
    return user


def approve_onboarding(db: Session, user_id: int) -> User | None:
    """Admin/HR approves a user's onboarding — sets them to active."""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    user.status = "active"
    user.is_verified = True
    user.onboarding_status = "approved"
    db.commit()
    db.refresh(user)
    return user


def change_password(db: Session, user_id: int, old_password: str, new_password: str) -> dict:
    """Change password — used for first-time temp password change."""
    user = get_user_by_id(db, user_id)
    if not user:
        return {"error": "User not found"}
    if not verify_password(old_password, user.password):
        return {"error": "Current password is incorrect"}
    user.password = hash_password(new_password)
    user.temp_password_changed = True
    db.commit()
    return {"message": "Password changed successfully"}