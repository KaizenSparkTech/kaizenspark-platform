CREATE TABLE alembic_version (
	version_num VARCHAR(32) NOT NULL, 
	CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);
CREATE TABLE departments (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	description TEXT, 
	head_id INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(head_id) REFERENCES users (id) ON DELETE SET NULL, 
	UNIQUE (name)
);
CREATE INDEX ix_departments_id ON departments (id);
CREATE TABLE designations (
	id INTEGER NOT NULL, 
	title VARCHAR(100) NOT NULL, 
	level VARCHAR(20) NOT NULL, 
	department_id INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id) ON DELETE CASCADE
);
CREATE INDEX ix_designations_id ON designations (id);
CREATE TABLE internship_programs (
	id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description TEXT, 
	duration VARCHAR(50), 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id)
);
CREATE INDEX ix_internship_programs_id ON internship_programs (id);
CREATE TABLE leads (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	message TEXT NOT NULL, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id)
);
CREATE INDEX ix_leads_id ON leads (id);
CREATE TABLE teams (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	description TEXT, 
	department_id INTEGER, 
	lead_id INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id) ON DELETE CASCADE, 
	FOREIGN KEY(lead_id) REFERENCES users (id) ON DELETE SET NULL
);
CREATE INDEX ix_teams_id ON teams (id);
CREATE TABLE users (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	password VARCHAR NOT NULL, 
	role VARCHAR(50) NOT NULL, 
	phone VARCHAR(20), 
	avatar_url VARCHAR(500), 
	employee_id VARCHAR(20), 
	date_of_joining DATE, 
	status VARCHAR(20), 
	is_verified BOOLEAN, 
	department_id INTEGER, 
	designation_id INTEGER, 
	team_id INTEGER, 
	reporting_to INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id) ON DELETE SET NULL, 
	FOREIGN KEY(designation_id) REFERENCES designations (id) ON DELETE SET NULL, 
	FOREIGN KEY(reporting_to) REFERENCES users (id) ON DELETE SET NULL, 
	FOREIGN KEY(team_id) REFERENCES teams (id) ON DELETE SET NULL, 
	UNIQUE (employee_id)
);
CREATE UNIQUE INDEX ix_users_email ON users (email);
CREATE INDEX ix_users_id ON users (id);
CREATE TABLE approvals (
	id INTEGER NOT NULL, 
	entity_type VARCHAR(50) NOT NULL, 
	entity_id INTEGER NOT NULL, 
	approver_id INTEGER, 
	status VARCHAR(20), 
	comments TEXT, 
	approved_at DATETIME, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(approver_id) REFERENCES users (id) ON DELETE SET NULL
);
CREATE INDEX ix_approvals_id ON approvals (id);
CREATE TABLE attendance (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	date DATE NOT NULL, 
	check_in DATETIME, 
	check_out DATETIME, 
	total_hours NUMERIC(4, 2), 
	status VARCHAR(20), 
	notes TEXT, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_attendance_id ON attendance (id);
CREATE TABLE audit_logs (
	id INTEGER NOT NULL, 
	user_id INTEGER, 
	action VARCHAR(10) NOT NULL, 
	entity_type VARCHAR(50) NOT NULL, 
	entity_id INTEGER, 
	old_values TEXT, 
	new_values TEXT, 
	ip_address VARCHAR(45), 
	user_agent VARCHAR(500), 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE SET NULL
);
CREATE INDEX ix_audit_logs_id ON audit_logs (id);
CREATE TABLE certificates (
	id INTEGER NOT NULL, 
	intern_id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	certificate_url VARCHAR, 
	issued_date DATE DEFAULT (CURRENT_DATE), 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(intern_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_certificates_id ON certificates (id);
CREATE TABLE intern_applications (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	program_id INTEGER NOT NULL, 
	status VARCHAR(50), 
	applied_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(program_id) REFERENCES internship_programs (id) ON DELETE CASCADE, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	UNIQUE (user_id, program_id)
);
CREATE INDEX ix_intern_applications_id ON intern_applications (id);
CREATE TABLE intern_tasks (
	id INTEGER NOT NULL, 
	intern_id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description TEXT, 
	github_link TEXT, 
	submission_date DATETIME, 
	status VARCHAR(50), 
	score INTEGER, 
	reviewed_by INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(intern_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(reviewed_by) REFERENCES users (id)
);
CREATE INDEX ix_intern_tasks_id ON intern_tasks (id);
CREATE TABLE leave_balances (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	leave_type VARCHAR(30) NOT NULL, 
	total_days INTEGER, 
	used_days INTEGER, 
	year INTEGER NOT NULL, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	CONSTRAINT uq_user_leave_year UNIQUE (user_id, leave_type, year)
);
CREATE INDEX ix_leave_balances_id ON leave_balances (id);
CREATE TABLE leave_requests (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	leave_type VARCHAR(30) NOT NULL, 
	start_date DATE NOT NULL, 
	end_date DATE NOT NULL, 
	reason TEXT, 
	status VARCHAR(20), 
	approved_by INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(approved_by) REFERENCES users (id) ON DELETE SET NULL, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_leave_requests_id ON leave_requests (id);
CREATE TABLE notifications (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	message TEXT, 
	type VARCHAR(30), 
	entity_type VARCHAR(50), 
	entity_id INTEGER, 
	is_read BOOLEAN, 
	read_at DATETIME, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_notifications_id ON notifications (id);
CREATE TABLE offer_letters (
	id INTEGER NOT NULL, 
	candidate_name VARCHAR(100) NOT NULL, 
	candidate_email VARCHAR(100) NOT NULL, 
	role_offered VARCHAR(50) NOT NULL, 
	department_id INTEGER, 
	designation_id INTEGER, 
	salary_offered NUMERIC(12, 2), 
	joining_date DATE, 
	offer_expiry_date DATE, 
	letter_content TEXT, 
	letter_url VARCHAR(500), 
	status VARCHAR(20), 
	sent_by INTEGER, 
	accepted_at DATETIME, 
	signature_text VARCHAR(200), 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id) ON DELETE SET NULL, 
	FOREIGN KEY(designation_id) REFERENCES designations (id) ON DELETE SET NULL, 
	FOREIGN KEY(sent_by) REFERENCES users (id) ON DELETE SET NULL
);
CREATE INDEX ix_offer_letters_id ON offer_letters (id);
CREATE TABLE onboarding_checklists (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	task_title VARCHAR(255) NOT NULL, 
	task_description TEXT, 
	assigned_by INTEGER, 
	status VARCHAR(20), 
	due_date DATE, 
	completed_at DATETIME, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(assigned_by) REFERENCES users (id) ON DELETE SET NULL, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_onboarding_checklists_id ON onboarding_checklists (id);
CREATE TABLE payroll (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	month INTEGER NOT NULL, 
	year INTEGER NOT NULL, 
	basic_salary NUMERIC(12, 2), 
	allowances NUMERIC(12, 2), 
	deductions NUMERIC(12, 2), 
	net_salary NUMERIC(12, 2), 
	status VARCHAR(20), 
	paid_date DATE, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_payroll_id ON payroll (id);
CREATE TABLE performance_reviews (
	id INTEGER NOT NULL, 
	employee_id INTEGER NOT NULL, 
	reviewer_id INTEGER, 
	review_period VARCHAR(50) NOT NULL, 
	rating INTEGER, 
	strengths TEXT, 
	areas_of_improvement TEXT, 
	goals TEXT, 
	status VARCHAR(20), 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(employee_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(reviewer_id) REFERENCES users (id) ON DELETE SET NULL
);
CREATE INDEX ix_performance_reviews_id ON performance_reviews (id);
CREATE TABLE project_requests (
	id INTEGER NOT NULL, 
	client_id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description TEXT, 
	requirements_doc_url VARCHAR(500), 
	proposed_budget NUMERIC(12, 2), 
	currency VARCHAR(3), 
	expected_deadline DATE, 
	priority VARCHAR(20), 
	status VARCHAR(30), 
	reviewed_by INTEGER, 
	approved_by INTEGER, 
	rejection_reason TEXT, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(approved_by) REFERENCES users (id) ON DELETE SET NULL, 
	FOREIGN KEY(client_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(reviewed_by) REFERENCES users (id) ON DELETE SET NULL
);
CREATE INDEX ix_project_requests_id ON project_requests (id);
CREATE TABLE team_members (
	id INTEGER NOT NULL, 
	team_id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	role_in_team VARCHAR(20), 
	joined_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(team_id) REFERENCES teams (id) ON DELETE CASCADE, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	CONSTRAINT uq_team_user UNIQUE (team_id, user_id)
);
CREATE INDEX ix_team_members_id ON team_members (id);
CREATE TABLE projects (
	id INTEGER NOT NULL, 
	client_id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description TEXT, 
	status VARCHAR(50), 
	project_request_id INTEGER, 
	project_manager_id INTEGER, 
	team_id INTEGER, 
	budget NUMERIC(12, 2), 
	currency VARCHAR(3), 
	start_date DATE, 
	end_date DATE, 
	actual_end_date DATE, 
	priority VARCHAR(20), 
	completion_percentage INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(client_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(project_manager_id) REFERENCES users (id) ON DELETE SET NULL, 
	FOREIGN KEY(project_request_id) REFERENCES project_requests (id) ON DELETE SET NULL, 
	FOREIGN KEY(team_id) REFERENCES teams (id) ON DELETE SET NULL
);
CREATE INDEX ix_projects_id ON projects (id);
CREATE TABLE submissions (
	id INTEGER NOT NULL, 
	intern_task_id INTEGER NOT NULL, 
	github_link TEXT NOT NULL, 
	submitted_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	reviewed BOOLEAN, 
	feedback TEXT, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(intern_task_id) REFERENCES intern_tasks (id) ON DELETE CASCADE
);
CREATE INDEX ix_submissions_id ON submissions (id);
CREATE TABLE documents (
	id INTEGER NOT NULL, 
	project_id INTEGER, 
	uploaded_by INTEGER, 
	file_url VARCHAR NOT NULL, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE, 
	FOREIGN KEY(uploaded_by) REFERENCES users (id)
);
CREATE INDEX ix_documents_id ON documents (id);
CREATE TABLE invoices (
	id INTEGER NOT NULL, 
	project_id INTEGER NOT NULL, 
	amount NUMERIC(10, 2) NOT NULL, 
	status VARCHAR(50), 
	issued_date DATE DEFAULT (CURRENT_DATE), 
	due_date DATE, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE
);
CREATE INDEX ix_invoices_id ON invoices (id);
CREATE TABLE milestones (
	id INTEGER NOT NULL, 
	project_id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description TEXT, 
	progress INTEGER, 
	deadline DATE, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE
);
CREATE INDEX ix_milestones_id ON milestones (id);
CREATE TABLE tasks (
	id INTEGER NOT NULL, 
	milestone_id INTEGER, 
	project_id INTEGER, 
	assigned_to INTEGER, 
	assigned_by INTEGER, 
	title VARCHAR(255) NOT NULL, 
	description TEXT, 
	status VARCHAR(50), 
	priority VARCHAR(20), 
	deadline DATE, 
	estimated_hours INTEGER, 
	actual_hours INTEGER, 
	tags VARCHAR(500), 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(assigned_by) REFERENCES users (id), 
	FOREIGN KEY(assigned_to) REFERENCES users (id), 
	FOREIGN KEY(milestone_id) REFERENCES milestones (id) ON DELETE CASCADE, 
	FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE
);
CREATE INDEX ix_tasks_id ON tasks (id);
CREATE TABLE timesheets (
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	project_id INTEGER, 
	task_id INTEGER, 
	date DATE NOT NULL, 
	hours_worked NUMERIC(4, 2) NOT NULL, 
	description TEXT, 
	status VARCHAR(20), 
	approved_by INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(approved_by) REFERENCES users (id) ON DELETE SET NULL, 
	FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE SET NULL, 
	FOREIGN KEY(task_id) REFERENCES tasks (id) ON DELETE SET NULL, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_timesheets_id ON timesheets (id);
