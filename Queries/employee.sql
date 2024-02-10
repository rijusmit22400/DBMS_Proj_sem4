CREATE TABLE employee_table (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    company_email VARCHAR(1000),
    userID VARCHAR(100),
    bonus INT,
    address VARCHAR(1000),
    FOREIGN KEY (userID) REFERENCES registered_person(userID)
);

INSERT INTO employee_table (company_email, userID, bonus, address) 
VALUES 
('john@example.com', 'john123', 5000, '123 Main Street'),
('alice@example.com', 'alice456', 7000, '456 Elm Street'),
('bob@example.com', 'bob789', 6000, '789 Oak Avenue'),
('emma@example.com', 'emma101', 5500, '321 Pine Road'),
('michael@example.com', 'michael202', 8000, '654 Birch Lane');

SELECT 'Table Employee_table' AS table_name;
SELECT * FROM employee_table;