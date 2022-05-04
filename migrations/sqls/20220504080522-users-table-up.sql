CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    password_digest VARCHAR
);