from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# fake DB (temporary)
fake_users_db = {}

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def register_user(email: str, password: str):
    if email in fake_users_db:
        return {"error": "User already exists"}

    hashed_password = hash_password(password)

    fake_users_db[email] = {
        "email": email,
        "password": hashed_password
    }

    return {"message": "User registered successfully"}


def login_user(email: str, password: str):
    user = fake_users_db.get(email)

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user["password"]):
        return {"error": "Invalid password"}

    return {"message": "Login successful"}
