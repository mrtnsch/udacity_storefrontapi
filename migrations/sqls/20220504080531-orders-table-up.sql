CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status VARCHAR
);
INSERT INTO orders (user_id, status) VALUES (
    1, 'completed'
);