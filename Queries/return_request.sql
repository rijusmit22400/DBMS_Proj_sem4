CREATE TABLE return_request (
    USERID VARCHAR(100),
    RETURN_ID INT AUTO_INCREMENT PRIMARY KEY,
    REASON VARCHAR(10000) NOT NULL,
    STATUS VARCHAR(20) NOT NULL, -- Change ENUM to VARCHAR
    FOREIGN KEY (USERID) REFERENCES registered_person(userID)
);

INSERT INTO return_request (USERID, REASON, STATUS)
VALUES 
('JohnDoe-johndoe@example.com', 'Defective product', 'not returned'),
('EmilyBrown-emilybrown@example.com', 'Wrong item received', 'not returned'),
('BobJohnson-bobjohnson@example.com', 'Item damaged during shipping', 'not returned');
SELECT 'Table : RETURN_REQUEST' AS table_name;
SELECT * FROM return_request;
