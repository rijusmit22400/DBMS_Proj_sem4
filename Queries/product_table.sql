 CREATE TABLE product_table (
    PRODUCT_ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(1000),
    QUANTITY INT NOT NULL,
    STOCK_NUMBER INT UNIQUE,
    DATE_OF_ARRIVAL VARCHAR(100),
    SHIPMENT_DETAILS VARCHAR(100),
    PRICE INT NOT NULL CHECK (PRICE > 0),
    CATEGORY VARCHAR(100) NOT NULL,
    ELECTRONICS_TYPE VARCHAR(100) NOT NULL
);

INSERT INTO product_table (NAME, QUANTITY, STOCK_NUMBER, DATE_OF_ARRIVAL, SHIPMENT_DETAILS, PRICE, CATEGORY, ELECTRONICS_TYPE)
VALUES 
('Product 1', 100, 12345, '2024-02-07', 'Railway', 50, 'Electronics', 'Smartphone'),
('Product 2', 150, 23456, '2024-02-08', 'Airplane', 75, 'Electronics', 'Laptop'),
('Product 3', 200, 34567, '2024-02-09', 'Railway', 100, 'Electronics', 'Tablet'),
('Product 4', 250, 45678, '2024-02-10', 'Airplane', 125, 'Electronics', 'Smartwatch');
SELECT 'TABLE product_table ' as table_name ;
SELECT * FROM product_table;

