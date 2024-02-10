CREATE TABLE wishlist (
    WISHLIST_ID INT AUTO_INCREMENT PRIMARY KEY,
    PRODUCT_ID INT,
    USER_ID VARCHAR(1000),
    TOTAL_AMOUNT INT DEFAULT 0,
    DELIVERY_MODE VARCHAR(20)
);

-- Inserting data into the wishlist table
INSERT INTO wishlist (PRODUCT_ID, USER_ID, TOTAL_AMOUNT, DELIVERY_MODE)
VALUES 
(1, 'john123', 0, 'COD'),
(2, 'alice456', 5000, 'Pre-payment'),
(3, 'bob789', 7500, 'COD'),
(4, 'emma101', 10000, 'Pre-payment');

-- Print each entry in the wishlist table
SELECT 'TABLE wishlist' as table_name;
SELECT * FROM wishlist;