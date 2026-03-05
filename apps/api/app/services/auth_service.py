from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)

def register_user(email: str, password: str):
    hashed_password = hash_password(password)

    return {
        "message": "User registered successfully",
        "email": email,
        "hashed_password": hashed_password
    }

def login_user(email: str, password: str):
    return {
        "message": "Login successful",
        "email": email
    }
