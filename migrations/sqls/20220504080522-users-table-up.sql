CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    password_digest VARCHAR
);
INSERT INTO users (firstName,lastName,password_digest) VALUES ('Tester1','Tester1LastName','$2b$10$FD16Z06G1Y9CbVsuzBG86..Lk.S24Y/7NuiJ6iTVybiPoxdQkrpzS');