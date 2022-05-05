CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price DECIMAL,
    category VARCHAR
);
INSERT INTO products 
(name, price, category) 
VALUES 
('Amazing product 1', 10.2,'Household'),
('Amazing product 2', 15.2,'Household'),
('Amazing product 3', 167.2,'Household'),
('Amazing product 4', 17.2,'Garden'),
('Amazing product 5', 18.2,'Garden'),
('Amazing product 6', 176.2,'Garden');
