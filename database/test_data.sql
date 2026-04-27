INSERT INTO users (name, email, password, role)
VALUES ('Narmatha', 'narmatha@gmail.com', 'hashed_password', 'intern');
SELECT * FROM users;

INSERT INTO projects (client_id, title, description)
VALUES (1, 'Website Development', 'Build company website');
SELECT * FROM projects;

INSERT INTO milestones (project_id, title)
VALUES (1, 'UI Design');
SELECT * FROM milestones;

INSERT INTO tasks (milestone_id, title)
VALUES (1, 'Create homepage UI');
SELECT * FROM tasks;

INSERT INTO intern_tasks (intern_id, title)
VALUES (1, 'Build ML model');
SELECT * FROM intern_tasks;
