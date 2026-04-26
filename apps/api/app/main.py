from fastapi import FastAPI
from app.database.connection import Base, engine

# Import all routers
from app.routers.user_router import router as user_router
from app.routers.certificate_router import router as certificate_router
from app.routers.document_router import router as document_router
from app.routers.intern_application_router import router as intern_app_router
from app.routers.intern_task_router import router as intern_task_router
from app.routers.internship_program_router import router as internship_prog_router
from app.routers.invoice_router import router as invoice_router
from app.routers.lead_router import router as lead_router
from app.routers.milestone_router import router as milestone_router
from app.routers.project_router import router as project_router
from app.routers.submission_router import router as submission_router
from app.routers.task_router import router as task_router
# from app.routers.projects import router as projects_router
# from app.routers.tasks import router as tasks_router
from app.routers.auth import router as auth_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="KaizenSpark Platform API")

# Include all routers
app.include_router(user_router)
app.include_router(certificate_router)
app.include_router(document_router)
app.include_router(intern_app_router)
app.include_router(intern_task_router)
app.include_router(internship_prog_router)
app.include_router(invoice_router)
app.include_router(lead_router)
app.include_router(milestone_router)
app.include_router(project_router)
app.include_router(submission_router)
app.include_router(task_router)
# app.include_router(projects_router)
# app.include_router(tasks_router)
app.include_router(auth_router)
# Root endpoint
@app.get("/")
def root():
    return {"message": "KaizenSpark Platform API is running!"}