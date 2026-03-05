def register_user(email: str, password: str):
    return {
        "message": "User registered",
        "email": email
    }

def login_user(email: str, password: str):
    return {
        "message": "Login successful",
        "email": email
    }
