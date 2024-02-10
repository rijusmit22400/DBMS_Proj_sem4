USE KRSR;

CREATE TABLE registered_person (
    serial_number INT AUTO_INCREMENT PRIMARY KEY,
    userID VARCHAR(100) UNIQUE,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100),
    EmailID VARCHAR(100),
    Phone_number LONG,
    address VARCHAR(1000) NOT NULL
);

INSERT INTO registered_person (userID, name, username, EmailID, Phone_number, address) 
VALUES 
('JohnDoe-johndoe@example.com', 'John Doe', 'johndoe', 'johndoe@example.com', 1234567890, '123 Main Street'),
('BobJohnson-bobjohnson@example.com', 'Bob Johnson', 'bobjohnson', 'bobjohnson@example.com', 1112223333, '789 Oak Avenue'),
('EmilyBrown-emilybrown@example.com', 'Emily Brown', 'emilybrown', 'emilybrown@example.com', 1112223333, '321 Pine Road'),
('MichaelDavis-michaeldavis@example.com', 'Michael Davis', 'michaeldavis', 'michaeldavis@example.com', 9998887777, '654 Birch Lane'),
('EmmaWilson-emmawilson@example.com', 'Emma Wilson', 'emmawilson', 'emmawilson@example.com', 3334445555, '987 Cedar Drive'),
('DavidMartinez-davidmartinez@example.com', 'David Martinez', 'davidmartinez', 'davidmartinez@example.com', 7776665555, '159 Maple Street'),
('OliviaGarcia-oliviagarcia@example.com', 'Olivia Garcia', 'oliviagarcia', 'oliviagarcia@example.com', 2223334444, '852 Walnut Avenue'),
('JamesTaylor-jamestaylor@example.com', 'James Taylor', 'jamestaylor', 'jamestaylor@example.com', 4445556666, '753 Rose Lane'),
('SophiaRodriguez-sophiarodriguez@example.com', 'Sophia Rodriguez', 'sophiarodriguez', 'sophiarodriguez@example.com', 6667778888, '369 Vine Street');
