/*CREATE TABLE extended_warranty (
    USER_ID VARCHAR(1000),
    PRICE INT NOT NULL CHECK (PRICE > 0),
    DATE VARCHAR(1000),
    INSURANCE_PRICE INT CHECK (INSURANCE_PRICE > 0),
    PRODUCT_ID INT,
    FOREIGN KEY (PRODUCT_ID) REFERENCES product_table(PRODUCT_ID)
);
INSERT INTO extended_warranty (USER_ID, PRICE, DATE, INSURANCE_PRICE, PRODUCT_ID)
VALUES 
('user1', 200, '2024-02-07', 50, 1),
('user2', 300, '2024-02-08', 75, 2),
('user3', 400, '2024-02-09', 100, 3),
('user4', 500, '2024-02-10', 125, 4);*/

SELECT * FROM extended_warranty;