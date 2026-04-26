from sqlalchemy.orm import Session
from app.models.user import User
from app.services.user_service import create_user
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def register_user(db: Session, email: str, password: str):
    # Check if user exists
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        return {"error": "User already exists"}

    # Use existing user_service to create user
    # Note: UserCreate requires name and role, so we'll use defaults if not provided
    user_data = UserCreate(
        name=email.split("@")[0],
        email=email,
        password=password,
        role="user"
    )
    new_user = create_user(db, user_data)
    if not new_user:
        return {"error": "Failed to create user"}

    return {"message": "User registered successfully"}

def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user.password_hash):
        return {"error": "Invalid password"}

    return {"message": "Login successful"}
