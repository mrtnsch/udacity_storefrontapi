CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);
INSERT INTO order_products (quantity,order_id,product_id) VALUES 
    (5,1,1),
    (7,1,2),
    (10,1,3);