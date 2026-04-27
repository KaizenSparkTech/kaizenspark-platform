# 📊 Database Documentation – KaizenSpark Platform

## 📁 Overview

This folder contains the database schema and test data for the KaizenSpark Platform.

* `schema.sql` → Defines all tables and relationships
* `test_data.sql` → Contains sample data for testing

---

## 🧠 Database Design

The database is designed to support:

* User management (admin, client, intern, etc.)
* Project tracking
* Task & milestone management
* Intern workflows
* Corporate features (invoices, leads, documents)

---

## 👤 Users Table

Stores all system users.

**Roles supported:**

* `admin`
* `client`
* `intern`
* `mentor`
* `developer`
* `finance`

---

## 📁 Projects Flow

```
Users (client)
   ↓
Projects
   ↓
Milestones
   ↓
Tasks
```

* A client creates projects
* Each project has milestones
* Each milestone contains tasks

---

## 🎓 Intern Workflow

```
Users (intern)
   ↓
Intern Tasks
   ↓
Submissions
   ↓
Certificates
```

* Interns are assigned tasks
* They submit work via GitHub links
* Submissions are reviewed
* Certificates are issued

---

## 🏢 Corporate Features

### 💰 Invoices

* Linked to projects
* Tracks payments (paid/unpaid/overdue)

### 📄 Documents

* File storage for project-related files

### 📬 Leads

* Stores contact form submissions

---

## 🎓 Internship Programs

```
Internship Programs
   ↓
Intern Applications
```

* Users apply for programs
* Status: pending / approved / rejected

---

## 🔐 Constraints & Validations

* Email is unique for users
* Role-based restrictions using CHECK constraints
* Status fields are controlled (no invalid values)
* Score & progress are limited (0–100)
* Foreign keys ensure data integrity

---

## ⚡ Performance

Indexes are added on:

* `users.email`
* `projects.client_id`
* `tasks.assigned_to`

---

## 🧪 Test Data

Use `test_data.sql` to:

* Populate sample users
* Create demo projects
* Assign tasks and intern work

---

## 🚀 Usage

### 1. Create Database

```sql
CREATE DATABASE kaizenspark_db;
```

### 2. Run Schema

```sql
\i schema.sql
```

### 3. Insert Test Data

```sql
\i test_data.sql
```

---

## 📌 Notes

* All timestamps use current system time
* Relationships use `ON DELETE CASCADE` where needed
* Designed for integration with backend APIs (FastAPI)

---

## 👩‍💻 Author

Database designed by: Narmatha R
Role: Database Developer (Team KaizenSpark)

---
