
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE Table users (
    id UUID PRIMARY KEY   DEFAULT uuid_generate_v4() NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- insert fake users

INSERT INTO users (username, password, email) VALUES ('admin', 'admin', 'admin@gmail.com');