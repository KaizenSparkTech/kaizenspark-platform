from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
def login():
    return {"message": "Login successful"}

@router.post("/register")
def register():
    return {"message": "User registered"}
