from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserRegister, UserLogin
from app.services.auth_service import register_user, login_user
from app.database.connection import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    return register_user(db, user.email, user.password)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user.email, user.password)
