CREATE TABLE IF NOT EXISTS calculation_history (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    details JSONB,
    result VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
