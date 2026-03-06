from fastapi import APIRouter
from app.schemas.user_schema import UserRegister, UserLogin
from app.services.auth_service import register_user, login_user

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/register")
def register(user: UserRegister):
    return register_user(user.email, user.password)

@router.post("/login")
def login(user: UserLogin):
    return login_user(user.email, user.password)
