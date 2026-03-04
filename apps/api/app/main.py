from fastapi import FastAPI
from app.routers import auth

app = FastAPI(title="KaizenSpark API")

app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "KaizenSpark API Running"}
