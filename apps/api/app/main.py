"""
KaizenSpark Platform API — Main application entry point.
Enterprise ERP with 12 roles, RBAC, audit logging, and full lifecycle management.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database.connection import Base, engine
from app.middleware.audit import AuditLogMiddleware

# --- Existing routers ---
from app.routers.auth import router as auth_router
from app.routers.user_router import router as user_router
from app.routers.project_router import router as project_router
from app.routers.milestone_router import router as milestone_router
from app.routers.task_router import router as task_router
from app.routers.invoice_router import router as invoice_router
from app.routers.lead_router import router as lead_router
from app.routers.document_router import router as document_router
from app.routers.certificate_router import router as certificate_router
from app.routers.intern_task_router import router as intern_task_router
from app.routers.submission_router import router as submission_router
from app.routers.internship_program_router import router as internship_prog_router
from app.routers.intern_application_router import router as intern_app_router

# --- Phase 1: Organization & Audit ---
from app.routers.department_router import router as department_router
from app.routers.designation_router import router as designation_router
from app.routers.team_router import router as team_router
from app.routers.audit_log_router import router as audit_log_router
from app.routers.system_setting_router import router as system_setting_router

# --- Phase 2: HR Module ---
from app.routers.offer_letter_router import router as offer_letter_router
from app.routers.hr_router import onboarding_router, attendance_router, leave_router

# --- Phase 3: Project Requests & Approvals ---
from app.routers.project_request_router import router as project_request_router
from app.routers.approval_router import router as approval_router

# --- Phase 4: Operations ---
from app.routers.operations_router import (
    notification_router, timesheet_router, review_router, payroll_router,
)

# Import all models so they register with Base.metadata
from app.models import (  # noqa: F401
    user, project, milestone, task,
    invoice, document, lead, certificate,
    intern_task, submission, internship_program, intern_application,
    department, designation, team, team_member, audit_log,
    offer_letter, onboarding_checklist, attendance, leave_request, leave_balance,
    project_request, approval,
    notification, timesheet, performance_review, payroll,
    system_setting,
)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create database tables on startup."""
    Base.metadata.create_all(bind=engine)
    yield


# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_TITLE,
    version="2.0.0",
    description="Enterprise ERP Platform — HR, Projects, Finance, Approvals, 12 Roles with RBAC",
    lifespan=lifespan,
)

# Audit log middleware (must be added before CORS)
app.add_middleware(AuditLogMiddleware)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API v1 routers ---
api_prefix = "/api/v1"

# Core
app.include_router(auth_router, prefix=api_prefix)
app.include_router(user_router, prefix=api_prefix)

# Organization
app.include_router(department_router, prefix=api_prefix)
app.include_router(designation_router, prefix=api_prefix)
app.include_router(team_router, prefix=api_prefix)
app.include_router(system_setting_router, prefix=api_prefix)

# Projects & Tasks
app.include_router(project_router, prefix=api_prefix)
app.include_router(milestone_router, prefix=api_prefix)
app.include_router(task_router, prefix=api_prefix)

# HR Module
app.include_router(offer_letter_router, prefix=api_prefix)
app.include_router(onboarding_router, prefix=api_prefix)
app.include_router(attendance_router, prefix=api_prefix)
app.include_router(leave_router, prefix=api_prefix)

# Project Requests & Approvals
app.include_router(project_request_router, prefix=api_prefix)
app.include_router(approval_router, prefix=api_prefix)

# Finance & Operations
app.include_router(invoice_router, prefix=api_prefix)
app.include_router(timesheet_router, prefix=api_prefix)
app.include_router(payroll_router, prefix=api_prefix)

# Notifications
app.include_router(notification_router, prefix=api_prefix)

# Performance
app.include_router(review_router, prefix=api_prefix)

# Audit
app.include_router(audit_log_router, prefix=api_prefix)

# Internship
app.include_router(internship_prog_router, prefix=api_prefix)
app.include_router(intern_app_router, prefix=api_prefix)
app.include_router(intern_task_router, prefix=api_prefix)
app.include_router(submission_router, prefix=api_prefix)
app.include_router(certificate_router, prefix=api_prefix)

# Corporate
app.include_router(lead_router, prefix=api_prefix)
app.include_router(document_router, prefix=api_prefix)


@app.get("/")
def root():
    return {
        "message": "KaizenSpark ERP Platform API is running!",
        "version": "2.0.0",
        "docs": "/docs",
    }


@app.post("/api/v1/dev/seed")
def seed_data():
    """Seed the database with the Super Admin — the company owner.
    All other users are created through the offer letter flow.
    """
    from sqlalchemy.orm import Session
    from app.database.connection import SessionLocal
    from app.services.user_service import create_user, get_user_by_email
    from app.schemas.user_schema import UserCreate

    db: Session = SessionLocal()
    try:
        # Only seed the Super Admin (company owner)
        if not get_user_by_email(db, "admin@kaizenspark.com"):
            create_user(db, UserCreate(
                name="Super Admin",
                email="admin@kaizenspark.com",
                password="admin123",
                role="super_admin",
            ))

        # Create sample departments
        from app.models.department import Department
        from app.models.team import Team
        if not db.query(Department).first():
            eng = Department(name="Engineering", description="Software Engineering Department")
            mkt = Department(name="Marketing", description="Marketing & Growth")
            hr_dept = Department(name="Human Resources", description="HR & People Operations")
            db.add_all([eng, mkt, hr_dept])
            db.commit()
            db.refresh(eng)

            team = Team(name="Platform Team", description="Core platform development", department_id=eng.id)
            db.add(team)
            db.commit()

        return {
            "message": "Seed complete — Super Admin created (admin@kaizenspark.com / admin123). Log in to start onboarding employees.",
        }
    finally:
        db.close()