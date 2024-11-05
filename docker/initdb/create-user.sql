use mysql;

-- Create the username and password
CREATE USER IF NOT EXISTS 'task_tracker_user'@'%' IDENTIFIED BY 'task_tracker_user_123';

-- Privileges for the new user
GRANT ALL PRIVILEGES ON *.* TO 'task_tracker_user'@'%';
FLUSH PRIVILEGES;

-- Create the database
CREATE DATABASE IF NOT EXISTS task_tracker;
