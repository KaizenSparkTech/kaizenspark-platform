"""User model — expanded for enterprise ERP with 12 roles."""

from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship

from app.database.connection import Base

# All valid roles in the system
VALID_ROLES = (
    "super_admin", "hr", "manager", "business_analyst",
    "project_manager", "team_lead", "employee", "developer",
    "intern", "mentor", "client", "finance",
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)  # bcrypt hash
    role = Column(String(50), nullable=False, default="employee")
    phone = Column(String(20), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    employee_id = Column(String(20), unique=True, nullable=True)  # KS-EMP-001
    date_of_joining = Column(Date, nullable=True)
    employment_type = Column(String(50), nullable=True)  # intern, full_time, contract, part_time
    internship_end_date = Column(Date, nullable=True)
    status = Column(String(20), default="active")  # active, onboarding, inactive, terminated, on_leave
    is_verified = Column(Boolean, default=False)

    # Personal / onboarding details
    personal_email = Column(String(100), nullable=True)  # candidate's real email (Gmail etc.)
    address = Column(Text, nullable=True)
    date_of_birth = Column(Date, nullable=True)
    github_url = Column(String(300), nullable=True)
    linkedin_url = Column(String(300), nullable=True)
    emergency_contact_name = Column(String(100), nullable=True)
    emergency_contact_phone = Column(String(20), nullable=True)
    onboarding_status = Column(String(20), default="none")  # none, pending, in_progress, completed, approved
    temp_password_changed = Column(Boolean, default=True)  # False for auto-created users

    # Organization hierarchy
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    designation_id = Column(Integer, ForeignKey("designations.id", ondelete="SET NULL"), nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="SET NULL"), nullable=True)
    reporting_to = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # --- Relationships ---

    # Organization
    department = relationship("Department", foreign_keys=[department_id], back_populates="members")
    designation = relationship("Designation", foreign_keys=[designation_id], back_populates="users")
    primary_team = relationship("Team", foreign_keys=[team_id])
    manager = relationship("User", remote_side="User.id", foreign_keys=[reporting_to])
    headed_department = relationship("Department", foreign_keys="Department.head_id", back_populates="head", uselist=False)
    led_team = relationship("Team", foreign_keys="Team.lead_id", back_populates="lead", uselist=False)
    team_memberships = relationship("TeamMember", back_populates="user", cascade="all, delete-orphan")

    # Projects & tasks
    projects = relationship("Project", back_populates="client", foreign_keys="Project.client_id")
    managed_projects = relationship("Project", foreign_keys="Project.project_manager_id", back_populates="project_manager")

    # Internship
    intern_tasks = relationship("InternTask", back_populates="intern", foreign_keys="InternTask.intern_id")
    certificates = relationship("Certificate", back_populates="intern", foreign_keys="Certificate.intern_id")
    intern_applications = relationship("InternApplication", back_populates="user")

    # Audit
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
