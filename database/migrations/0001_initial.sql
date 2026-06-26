-- Create service_requests table
CREATE TABLE service_requests (
    id TEXT PRIMARY KEY,
    request_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'MEDIUM',
    status TEXT NOT NULL DEFAULT 'SUBMITTED',
    assigned_technician TEXT DEFAULT NULL,
    reporter_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create status_history table
CREATE TABLE status_history (
    id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    old_status TEXT DEFAULT NULL,
    new_status TEXT NOT NULL,
    changed_by TEXT NOT NULL,
    notes TEXT DEFAULT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (request_id) REFERENCES service_requests (id) ON DELETE CASCADE
);

-- Create comments table
CREATE TABLE comments (
    id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (request_id) REFERENCES service_requests (id) ON DELETE CASCADE
);

-- Create indexes for performance optimization
CREATE INDEX idx_requests_status ON service_requests (status);
CREATE INDEX idx_requests_priority ON service_requests (priority);
CREATE INDEX idx_history_request_id ON status_history (request_id);
CREATE INDEX idx_comments_request_id ON comments (request_id);
