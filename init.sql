CREATE TABLE IF NOT EXISTS users ( 
    id SERIAL PRIMARY KEY, 
    user_name VARCHAR(100) UNIQUE NOT NULL,
    e_mail VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (id, user_name, e_mail, first_name, last_name, password)
VALUES  (0, 'razvan', 'kokovics.razvan@gmail.com', 'Razvan', 'Kokovics', 'razvan');