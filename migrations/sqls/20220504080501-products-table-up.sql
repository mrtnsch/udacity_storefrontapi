CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price DECIMAL,
    category VARCHAR
);
INSERT INTO products (name, price, category) VALUES ('Amazing product', 10.2,'Household');
