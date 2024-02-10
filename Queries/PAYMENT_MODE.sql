CREATE TABLE PAYMENT_MODE (
    NAME VARCHAR(1000),
    DEL_STATUS VARCHAR(100) NOT NULL
);

INSERT INTO PAYMENT_MODE (NAME, DEL_STATUS)
VALUES 
('Cash', 'Cash on Delivery'),
('Debit Card', 'Pre-Payment'),
('Credit Card', 'Pre-Payment'),
('Net Banking', 'Pre-Payment');

SELECT 'TABLE :payment methods 'as table_name  ;
SELECT * FROM PAYMENT_MODE ; 
