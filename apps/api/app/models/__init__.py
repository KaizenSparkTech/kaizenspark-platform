# Import all models to ensure they are registered with Base.metadata
# pyrefly: ignore [missing-import]
from app.models.user import User  # noqa: F401
from app.models.project import Project  # noqa: F401
from app.models.milestone import Milestone  # noqa: F401
from app.models.task import Task  # noqa: F401
from app.models.invoice import Invoice  # noqa: F401
from app.models.document import Document  # noqa: F401
from app.models.lead import Lead  # noqa: F401
from app.models.certificate import Certificate  # noqa: F401
from app.models.intern_task import InternTask  # noqa: F401
from app.models.submission import Submission  # noqa: F401
from app.models.internship_program import InternshipProgram  # noqa: F401
from app.models.intern_application import InternApplication  # noqa: F401

# Phase 1 — Organization & Audit
from app.models.department import Department  # noqa: F401
from app.models.designation import Designation  # noqa: F401
from app.models.team import Team  # noqa: F401
from app.models.team_member import TeamMember  # noqa: F401
from app.models.audit_log import AuditLog  # noqa: F401

# Phase 2 — HR Module
from app.models.offer_letter import OfferLetter  # noqa: F401
from app.models.onboarding_checklist import OnboardingChecklist  # noqa: F401
from app.models.attendance import Attendance  # noqa: F401
from app.models.leave_request import LeaveRequest  # noqa: F401
from app.models.leave_balance import LeaveBalance  # noqa: F401

# Phase 3 — Project Requests & Approvals
from app.models.project_request import ProjectRequest  # noqa: F401
from app.models.approval import Approval  # noqa: F401

# Phase 4 — Notifications, Timesheets, Performance, Payroll
from app.models.notification import Notification  # noqa: F401
from app.models.timesheet import Timesheet  # noqa: F401
from app.models.performance_review import PerformanceReview  # noqa: F401
from app.models.payroll import Payroll  # noqa: F401
