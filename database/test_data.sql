-- ==============================
-- USERS
-- ==============================
INSERT INTO users (name, email, password, role) VALUES
('Admin User', '[admin@kaizen.com](mailto:admin@kaizen.com)', 'hashed_pass', 'admin'),
('Client One', '[client1@kaizen.com](mailto:client1@kaizen.com)', 'hashed_pass', 'client'),
('Client Two', '[client2@kaizen.com](mailto:client2@kaizen.com)', 'hashed_pass', 'client'),
('Intern A', '[internA@kaizen.com](mailto:internA@kaizen.com)', 'hashed_pass', 'intern'),
('Intern B', '[internB@kaizen.com](mailto:internB@kaizen.com)', 'hashed_pass', 'intern'),
('Mentor One', '[mentor@kaizen.com](mailto:mentor@kaizen.com)', 'hashed_pass', 'mentor'),
('Finance Head', '[finance@kaizen.com](mailto:finance@kaizen.com)', 'hashed_pass', 'finance');

-- ==============================
-- PROJECTS
-- ==============================
INSERT INTO projects (client_id, title, description, status) VALUES
(2, 'E-Commerce Website', 'Build full stack ecommerce platform', 'in_progress'),
(3, 'AI Chatbot', 'Develop AI chatbot for customer support', 'pending');

-- ==============================
-- MILESTONES
-- ==============================
INSERT INTO milestones (project_id, title, description, progress, deadline) VALUES
(1, 'UI Design', 'Design frontend UI/UX', 40, '2026-05-10'),
(1, 'Backend API', 'Develop FastAPI backend', 20, '2026-05-20'),
(2, 'Model Development', 'Train chatbot model', 10, '2026-05-25');

-- ==============================
-- TASKS
-- ==============================
INSERT INTO tasks (milestone_id, assigned_to, title, description, status, priority, deadline) VALUES
(1, 4, 'Homepage UI', 'Design homepage layout', 'in_progress', 'high', '2026-05-05'),
(1, 5, 'Login Page UI', 'Design login page', 'pending', 'medium', '2026-05-06'),
(2, 6, 'API Setup', 'Setup FastAPI structure', 'pending', 'high', '2026-05-15'),
(3, 4, 'Data Collection', 'Collect training data', 'pending', 'medium', '2026-05-18');

-- ==============================
-- INTERN TASKS
-- ==============================
INSERT INTO intern_tasks (intern_id, title, description, github_link, status, score, reviewed_by) VALUES
(4, 'Build ML Model', 'Create regression model', 'https://github.com/internA/ml-model', 'submitted', 85, 6),
(5, 'Frontend Component', 'Build reusable React component', 'https://github.com/internB/react-ui', 'assigned', NULL, NULL);

-- ==============================
-- SUBMISSIONS
-- ==============================
INSERT INTO submissions (intern_task_id, github_link, reviewed, feedback) VALUES
(1, 'https://github.com/internA/ml-model-v1', TRUE, 'Good work, improve accuracy');

-- ==============================
-- CERTIFICATES
-- ==============================
INSERT INTO certificates (intern_id, title, certificate_url) VALUES
(4, 'Machine Learning Internship', 'https://certs.kaizen.com/ml-cert');

-- ==============================
-- INVOICES
-- ==============================
INSERT INTO invoices (project_id, amount, status, due_date) VALUES
(1, 50000.00, 'unpaid', '2026-05-30'),
(2, 30000.00, 'paid', '2026-05-25');

-- ==============================
-- DOCUMENTS
-- ==============================
INSERT INTO documents (project_id, uploaded_by, file_url) VALUES
(1, 2, 'https://files.kaizen.com/project1/requirements.pdf'),
(2, 3, 'https://files.kaizen.com/project2/design.pdf');

-- ==============================
-- LEADS
-- ==============================
INSERT INTO leads (name, email, message) VALUES
('Ravi Kumar', '[ravi@gmail.com](mailto:ravi@gmail.com)', 'Interested in AI solutions'),
('Priya Sharma', '[priya@gmail.com](mailto:priya@gmail.com)', 'Need website development services');

-- ==============================
-- INTERNSHIP PROGRAMS
-- ==============================
INSERT INTO internship_programs (title, description, duration) VALUES
('AI Internship', 'Learn AI and ML concepts', '3 months'),
('Web Development Internship', 'Full stack web development', '2 months');

-- ==============================
-- INTERN APPLICATIONS
-- ==============================
INSERT INTO intern_applications (user_id, program_id, status) VALUES
(4, 1, 'approved'),
(5, 2, 'pending');
