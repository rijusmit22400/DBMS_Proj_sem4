CREATE TABLE customer (
    serial_number INT AUTO_INCREMENT PRIMARY KEY,
    userID VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100),
    EmailID VARCHAR(100),
    Phone_number LONG,
    address VARCHAR(1000) NOT NULL,
    loyalty_points INT DEFAULT 0,
    CONSTRAINT checker CHECK (loyalty_points >= 0 AND loyalty_points <= 5)
);
INSERT INTO customer (userID, password, username, EmailID, Phone_number, address) 
VALUES 
('JohnDoe@example.com', 'password123', 'JohnDoe', 'johndoe@example.com', 9876543210, '123 Main Street'),
('AliceSmith@example.com', 'pass123', 'AliceSmith', 'alicesmith@example.com', 9876543210, '456 Elm Street'),
('BobJohnson@example.com', 'bob123', 'BobJohnson', 'bobjohnson@example.com', 5551234567, '789 Oak Avenue'),
('EmilyBrown@example.com', 'emilypass', 'EmilyBrown', 'emilybrown@example.com', 1112223333, '321 Pine Road');
SELECT 'Table: customer' AS table_name;
SELECT * FROM customer ;