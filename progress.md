# Progress

Status date: 2026-04-25

Scope: FastAPI API and React + Vite web app. Based on current repo state and architecture docs.

## API (FastAPI)

### Current status
- [x] FastAPI app bootstrapped with root endpoint
- [x] SQLAlchemy Base and DB session factory present
- [x] Routers wired for auth, users, projects, tasks, milestones, invoices, leads, documents, certificates, internship programs, intern apps, intern tasks, submissions
- [x] Models, schemas, services exist per domain

### Gaps / issues found
- [ ] Duplicate routers for same paths: `/projects` and `/tasks` appear twice (conflicting behavior)
- [ ] Auth flow is stub: no DB user create, no JWT issue/verify, no password verify
- [ ] Auth schemas missing (`UserRegister`, `UserLogin`) but router imports them
- [ ] Models, schemas, services mismatched (field names, required fields, dates)
- [ ] No RBAC or auth dependencies on routes; all endpoints open
- [ ] DB URL hard-coded in connection module
- [ ] No tests detected
- [ ] No migrations (Alembic) detected

### TODO (prioritized)
- [ ] Choose single router per resource and remove duplicates
- [ ] Align model/schema/service fields for users, projects, tasks, internships, submissions, invoices
- [ ] Implement real auth: register, login, JWT, password verify
- [ ] Add RBAC dependencies and role-based filtering in services
- [ ] Add Alembic migrations and remove `create_all` from app startup
- [ ] Add env-based config and `.env.example`
- [ ] Add tests (unit + integration) and CI wiring
- [ ] Add logging, error handling, and request tracing
- [ ] Add seed data for local dev
- [ ] Add deployment config for API and DB

## Web (React + Vite)

### Current status
- [x] Vite + React + TypeScript + Tailwind scaffolding
- [x] React Router with Index and NotFound routes
- [x] React Query provider and UI providers (toasts, tooltips)
- [x] Marketing landing page sections implemented
- [x] Lint/test scripts present

### Gaps / issues found
- [ ] Only marketing site present; no client or intern portal routes
- [ ] No auth UI or protected routes
- [ ] No dashboard pages for projects, milestones, invoices, docs
- [ ] No intern workflows (programs, tasks, submissions, certificates)
- [ ] No API integration layer visible in pages

### TODO (prioritized)
- [ ] Decide app split: one app with 3 areas vs 3 separate apps
- [ ] Build auth UI and route guards
- [ ] Build corporate lead flow and wire to lead API
- [ ] Build client portal UI and wire to projects/milestones/invoices/docs APIs
- [ ] Build intern portal UI and wire to programs/tasks/submissions/certificates APIs
- [ ] Add API client layer (base URL, auth headers, error handling)
- [ ] Add e2e and component tests
- [ ] Add production build + deploy workflow

## Cross-cutting

### Current status
- [x] Monorepo layout with apps/api and apps/web
- [x] Architecture and roadmap docs present

### TODO / leftovers
- [ ] Align docs with actual repo layout (one web app vs three portals)
- [ ] Confirm feature completeness vs docs (auth, RBAC, invoices, certificates)
- [ ] Add env templates for API and web
- [ ] Define release pipeline and hosting targets
- [ ] Add monitoring/observability plan (logs, metrics, errors)
