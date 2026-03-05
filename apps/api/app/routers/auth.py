from fastapi import APIRouter
from app.schemas.user_schema import UserRegister, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
def login(user: UserLogin):
    return {
        "message": "Login successful",
        "email": user.email
    }

@router.post("/register")
def register(user: UserRegister):
    return {
        "message": "User registered",
        "email": user.email
    }
