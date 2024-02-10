CREATE TABLE country_codes (
    country_code VARCHAR(10) PRIMARY KEY,
    country_name VARCHAR(100)
);

INSERT INTO country_codes (country_code, country_name)
VALUES 
('+1', 'United States'),
('+44', 'United Kingdom'),
('+91', 'India'),
('+81', 'Japan'),
('+86', 'China'),
('+49', 'Germany'),
('+33', 'France'),
('+7', 'Russia'),
('+61', 'Australia'),
('+55', 'Brazil');
SELECT 'COUNTRY CODE AVAIABLE ' as table_name ;
SELECT *FROM country_codes;
