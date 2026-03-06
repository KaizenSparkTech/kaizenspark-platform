from fastapi import FastAPI
from app.routers import auth, project, task

app = FastAPI()

app.include_router(auth.router)
app.include_router(project.router)
app.include_router(task.router)

@app.get("/")
def root():
    return {"message": "KaizenSpark Platform API"}
