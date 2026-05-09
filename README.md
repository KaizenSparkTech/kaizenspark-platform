# KaizenSpark Enterprise ERP Platform

A comprehensive Enterprise Resource Planning (ERP) platform designed for modern tech companies. Features a decoupled organizational structure, automated internship lifecycles, and a streamlined client intake workflow.

## 🚀 Quick Start (Docker)

The easiest way to get the platform running is using Docker Compose. This spins up the FastAPI backend, React frontend, PostgreSQL database, Redis, and MinIO storage.

### 1. Prerequisites
- Docker and Docker Compose installed.
- Git.

### 2. Spin up the Stack
```bash
docker-compose up --build -d
```

### 3. Seed the Super Admin
Once the containers are healthy, you **must** seed the initial Super Admin (Company Owner) and default organizational structure:
```bash
curl -X POST http://localhost:8000/api/v1/dev/seed
```

### 4. Access the Platform
- **Frontend Portal:** [http://localhost](http://localhost) (Port 80)
- **API Documentation:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **MinIO Console:** [http://localhost:9001](http://localhost:9001)

---

## 🔐 Authentication & Roles

### Super Admin Credentials
- **Email:** `admin@kaizenspark.com`
- **Password:** `admin123`

### The Role System
The platform features 12+ roles including `super_admin`, `hr`, `manager`, `employee`, `intern`, and `client`.
- **Internal Users:** Created via the **Offer Letter** flow.
- **Clients:** Created via the **Lead Invitation** flow.

---

## 🛠 Core Workflows

### 1. Client Intake & Lead Generation
1.  **Public Submission:** Any visitor can visit the landing page (Signup/Contact form) and submit a project inquiry.
2.  **Lead Management:** Super Admin/HR sees this in the **Leads** tab.
3.  **Invitation:** Clicking "Invite Client" automatically generates a platform account and temporary credentials.
4.  **Project Request:** The lead is converted into a `ProjectRequest`, which the admin can then approve and allocate to a department.

### 2. Hiring & Onboarding (Interns/Employees)
1.  **Create Offer:** Admin goes to the **Offer Letters** tab, selects a Department and Designation (Role), and drafts an offer.
2.  **Send Offer:** Clicking "Send" generates a temporary password and notifies the candidate (manual sharing required as SMTP is not configured).
3.  **Candidate Onboarding:** Candidate logs in, fills out their profile (LinkedIn, GitHub, Address, etc.), and submits for approval.
4.  **Approval:** HR/Admin reviews the profile in the **Overview** tab and clicks **Approve** to activate the employee account.

### 3. Internship Lifecycle
- **Tracking:** Interns have an `internship_end_date`.
- **Conversion:** If an internship expires within 7 days, a **"Convert to Full Time"** button appears on the Admin Dashboard for seamless transition to a permanent role.

---

## 🏢 Organization Management

Admins can dynamically manage the company structure via the **Organization** tab:
- **Departments:** Create high-level groups (e.g., Engineering, Marketing).
- **Designations:** Create specific role titles linked to departments. These roles immediately become available in the hiring dropdowns.

---

## 💻 Development Guide

### Monorepo Structure
- `apps/api`: FastAPI (Python 3.12) with SQLAlchemy and Alembic.
- `apps/web`: React (TypeScript) with Vite and TailwindCSS.

### Running Locally (Without Docker)
If you want to run with hot-reloading for development:

**Backend:**
```bash
cd apps/api
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd apps/web
npm install
npm run dev
```
*Note: Ensure `vite.config.ts` points to `localhost:8000` for the API proxy.*

### Database Migrations
We use Alembic for migrations. To apply new changes:
```bash
docker-compose exec api alembic revision --autogenerate -m "description"
docker-compose exec api alembic upgrade head
```

---

## 🛡 Security & Audit
Every mutating request (POST/PUT/DELETE) is intercepted by the `AuditLogMiddleware` and recorded in the `audit_logs` table, ensuring full traceability of administrative actions.