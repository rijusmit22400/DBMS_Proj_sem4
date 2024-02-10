CREATE TABLE gaming_console (
    STOCK_QUANTITY INT NOT NULL,
    CATEGORY VARCHAR(1000),
    AVAILABLE_GAMES VARCHAR(1000),
    PRICE INT NOT NULL
);

INSERT INTO gaming_console (STOCK_QUANTITY, CATEGORY, AVAILABLE_GAMES, PRICE)
VALUES 
(50, 'Electronics', 'FIFA 22, Call of Duty: Warzone', 299),
(30, 'Electronics', 'Spider-Man: Miles Morales, Demon\'s Souls', 499),
(20, 'Electronics', 'Fortnite, Minecraft', 399),
(40, 'Electronics', 'Assassin\'s Creed Valhalla, NBA 2K22', 449);
SELECT 'TABLE gaming_console' AS table_name;
SELECT * FROM gaming_console;