CREATE TABLE account_settings (
    userID VARCHAR(100),
    Phone_number LONG NOT NULL,
    ORDER_ID VARCHAR(100),
    ADDRESS VARCHAR(1000),
    PAYMENT_MODE VARCHAR(1000),
    FOREIGN KEY (userID) REFERENCES registered_person(userID)
);
INSERT INTO account_settings (userID, Phone_number, ORDER_ID, ADDRESS, PAYMENT_MODE) 
VALUES 
('JohnDoe-johndoe@example.com', 1234567890, 'ORD123', '123 Main Street', 'Credit Card'),
('EmilyBrown-emilybrown@example.com', 9876543210, 'ORD456', '456 Elm Street', 'PayPal'),
('BobJohnson-bobjohnson@example.com', 5551234567, 'ORD789', '789 Oak Avenue', 'Debit Card'),
('EmmaWilson-emmawilson@example.com', 1112223333, 'ORD101', '321 Pine Road', 'Cash');
SELECT 'Table : accounts and settings ' as table_name ; 
SELECT * FROM account_settings  ;