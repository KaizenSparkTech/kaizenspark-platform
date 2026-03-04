🏢 KAIZENSPARK DIGITAL ECOSYSTEM
Multi-Portal Enterprise Architecture
📌 1️⃣ PROJECT INTRODUCTION

KaizenSpark is designed as a multi-platform enterprise system consisting of three independent yet connected applications:

🌐 Corporate Website – Marketing & Lead Generation

🔐 Client Portal – Project & Operations Management

🎓 Internship Platform – Training & Certification Management

All systems operate under one unified backend and database architecture, ensuring scalability, security, and clean separation of concerns.

🏗 2️⃣ HIGH-LEVEL ARCHITECTURE DIAGRAM
                          ┌─────────────────────────┐
                          │      Public Users       │
                          │  (CTOs, Founders, etc.) │
                          └────────────┬────────────┘
                                       │
                              🌐 Corporate Website
                                 (React - Public)
                                       │
                                       │ Contact / Lead API
                                       ▼
 ┌──────────────────────────────────────────────────────────────┐
 │                       FASTAPI BACKEND                        │
 │--------------------------------------------------------------│
 │  • Authentication (JWT)                                      │
 │  • Role-Based Access Control                                 │
 │  • Project Management Logic                                  │
 │  • Internship Management Logic                               │
 │  • Invoice System                                            │
 │  • Certificate Engine                                        │
 │  • File Handling                                             │
 └───────────────┬───────────────────────────────┬──────────────┘
                 │                               │
                 │                               │
        ┌────────▼────────┐             ┌────────▼────────┐
        │  Client Portal  │             │ Internship Portal│
        │  (React App)    │             │   (React App)    │
        └────────┬────────┘             └────────┬────────┘
                 │                                 │
                 └──────────────┬──────────────────┘
                                ▼
                      PostgreSQL Database
               (Users, Projects, Tasks, Invoices,
                Internship Data, Certificates, etc.)
🧱 3️⃣ TECH STACK ARCHITECTURE
🔹 Frontend Layer (3 Separate React Apps)
Platform	Tech Used	Purpose
Corporate	React	Marketing
Client Portal	React + Axios	Project tracking
Intern Portal	React + Axios	Internship management

Each frontend:

Handles UI

Stores JWT token

Sends REST API requests

Does NOT directly access database

🔹 Backend Layer (Single Central API)

Tech Stack:

FastAPI

SQLAlchemy

Pydantic

JWT (Authentication)

bcrypt (Password security)

Responsibilities:

Authentication & Authorization

Business Logic

Progress Calculation

Invoice Generation

Certificate Generation

Data Validation

Secure File Access

Backend is the core engine of the system.

🔹 Database Layer

Tech:

PostgreSQL

Stores:

Client System:

Users

Projects

Milestones

Invoices

Documents

Tickets

Intern System:

Internship Programs

Tasks

Submissions

Reviews

Certificates

Corporate:

Contact Leads

Data is separated logically using:

Role-based filtering

Foreign key constraints

🔄 4️⃣ COMPLETE WORKFLOW EXPLANATION
🌐 Corporate Website Workflow

Visitor → Views services
→ Downloads profile
→ Submits contact form
→ Backend stores lead in DB

No login
No dashboard
Public access only

🔐 Client Portal Workflow

Client logs in
→ Backend validates credentials
→ JWT issued
→ Client dashboard loads projects

Project Manager updates milestone
→ Backend updates DB
→ Progress recalculated
→ Client sees updated percentage

Finance generates invoice
→ PDF created
→ Status updated

This is real-time operational control.

🎓 Internship Platform Workflow

Intern registers
→ Admin approves
→ Task assigned
→ Intern submits GitHub link
→ Mentor reviews
→ Score saved
→ Certificate auto-generated

Fully structured learning workflow.

🔐 5️⃣ SECURITY ARCHITECTURE

Role-Based Access Control (RBAC):

Roles:

super_admin

project_manager

developer

finance

client

intern

mentor

Backend checks role before responding.

Example:

Client can only see their projects

Intern cannot access client data

Finance cannot modify internship data

JWT protects all private endpoints.

📁 6️⃣ GITHUB MONOREPO STRUCTURE
kaizenspark-ecosystem/

├── corporate-site/
│   └── React app
│
├── client-portal/
│   └── React dashboard
│
├── intern-platform/
│   └── React LMS
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── auth/
│   └── requirements.txt
│
├── database/
│   └── schema.sql
│
└── docs/
🚀 7️⃣ DEPLOYMENT ARCHITECTURE
Corporate Site  → Vercel
Client Portal   → Vercel
Intern Portal   → Vercel
Backend API     → Render / Railway
Database        → Neon (PostgreSQL Cloud)

Environment Variables:

DATABASE_URL

JWT_SECRET

SECRET_KEY

🎯 FINAL ARCHITECTURE SUMMARY

We are building:

✅ A marketing platform
✅ A client operations ERP
✅ A structured internship management system

Using:

React (Presentation Layer)

FastAPI (Application Layer)

PostgreSQL (Data Layer)

Following:

3-tier architecture

Role-based access control

Secure API-driven communication

Modular system design
