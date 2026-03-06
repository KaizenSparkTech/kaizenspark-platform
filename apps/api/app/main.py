from fastapi import FastAPI
from .routers import projects, tasks

app = FastAPI()

app.include_router(projects.router)
app.include_router(tasks.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

from .routers import projects, tasks
# ...
app.include_router(tasks.router)
