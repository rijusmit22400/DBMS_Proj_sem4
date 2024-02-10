CREATE TABLE feedback (
    FEEDBACK_ID INT AUTO_INCREMENT PRIMARY KEY,
    USER_ID VARCHAR(200),
    LODGED_DATE VARCHAR(1000),
    ORDER_ID INT NOT NULL,
    CATEGORY VARCHAR(1000),
    DESCRIPTION VARCHAR(1000),
    RATING INT CHECK (RATING BETWEEN 1 AND 5),
    FOREIGN KEY (USER_ID) REFERENCES registered_person(userID)
);

INSERT INTO feedback (USER_ID, LODGED_DATE, ORDER_ID, CATEGORY, DESCRIPTION, RATING)
VALUES 
('JohnDoe-johndoe@example.com', '2024-02-06', 12345, 'Delivery', 'The package arrived late.', 3),
('EmilyBrown-emilybrown@example.com', '2024-02-07', 23456, 'Product Quality', 'The product was damaged.', 2),
('BobJohnson-bobjohnson@example.com', '2024-02-08', 34567, 'Customer Service', 'Had a bad experience with customer support.', 1),
('BobJohnson-bobjohnson@example.com', '2024-02-09', 45678, 'Delivery', 'Delivery was prompt and product was in good condition.', 5);

SELECT 'TABLE feedback' AS table_name;
SELECT * FROM feedback;
