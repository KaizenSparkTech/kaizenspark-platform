INSERT INTO users (name, email, password, role)
VALUES
('Nani', 'nani@gmail.com', 'hashed_pass', 'intern'),
('Client1', 'client1@gmail.com', 'pass', 'client'),
('Mentor1', 'mentor@gmail.com', 'pass', 'mentor'),
('Admin1', 'admin@gmail.com', 'pass', 'admin');
SELECT * FROM users;

INSERT INTO projects (client_id, title, description)
VALUES (1, 'Website Development', 'Build company website');
SELECT * FROM projects;

INSERT INTO milestones (project_id, title)
VALUES (1, 'UI Design');
SELECT * FROM milestones;

INSERT INTO tasks (milestone_id, assigned_to, title, status)
VALUES
(1, 3, 'Design homepage UI', 'in_progress'),
(2, 3, 'Create API endpoints', 'pending');
SELECT * FROM tasks;

INSERT INTO intern_tasks (intern_id, title)
VALUES (1, 'Build ML model');
SELECT * FROM intern_tasks;

INSERT INTO submissions (intern_task_id, github_link, reviewed)
VALUES
(1, 'https://github.com/nexus/ml-project', TRUE),
(2, 'https://github.com/name/dashboard', FALSE);
SELECT * FROM submissions;

INSERT INTO certificates (intern_id, title, certificate_url)
VALUES
(1, 'AI Internship Completion', 'https://example.com/cert1.pdf');
SELECT * FROM certificates;

INSERT INTO invoices (project_id, amount, status, due_date)
VALUES
(1, 50000, 'unpaid', '2026-05-01'),
(2, 75000, 'paid', '2026-06-01');
SELECT * FROM invoices;

INSERT INTO documents (project_id, uploaded_by, file_url)
VALUES
(1, 3, 'https://example.com/file1.pdf'),
(2, 3, 'https://example.com/file2.pdf');
SELECT * FROM documents;

INSERT INTO leads (name, email, message)
VALUES
('Startup Founder', 'founder@gmail.com', 'Interested in your services'),
('CTO Company', 'cto@gmail.com', 'Need AI solutions');
SELECT * FROM leads;

INSERT INTO internship_programs (title, description, duration)
VALUES
('AI Internship', 'Learn AI & ML', '3 months'),
('Web Development', 'Full stack training', '2 months');
SELECT * FROM internship_programs;

INSERT INTO intern_applications (user_id, program_id, status)
VALUES
(1, 1, 'approved'),
(1, 2, 'pending');
SELECT * FROM intern_applications;

