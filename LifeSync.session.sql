--comment
-- @block 
CREATE TABLE Users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     email VARCHAR(255) NOT NULL UNIQUE,
     bio TEXT,
     country VARCHAR(2)
) --Insert into table
-- @block
INSERT INTO MonthEconomy (monthName, monthYear)
VALUES (
          'Oktober',
          2023
     ) 
     


-- @block
CREATE TABLE MonthEconomy (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthName VARCHAR(255),
     monthYear INT(4)
)


-- @block

CREATE TABLE Income (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT,
     etype INT(1) NOT NULL,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)

-- @block

CREATE TABLE Sell (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT,
     etype INT(1) NOT NULL,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)


-- @block

CREATE TABLE Expense (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT,
     etype INT(1) NOT NULL,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)

-- FASTE EXPENSES
-- @block
INSERT INTO Expense (monthEconomyId, etype, ename, enote, eamount)
VALUES 
(1, 1, 'Tryg', '', 323),
(1, 1, 'YouTube', '', 5.73),
(1, 1, 'Husleje', '', 4075),
(1, 1, 'Mad & Benz', '', 2000),
(1, 1, 'Klatreklub', '', 150),
(1, 1, 'PureGym', '', 358),
(1, 1, 'EWII', '', 266.5),
(1, 1, 'NetFlix', '', 36),
(1, 1, 'Lebara', '', 19)


-- MD EXPENSES
-- @block
INSERT INTO Expense (monthEconomyId, etype, ename, enote, eamount)
VALUES 
(1, 2, 'DSB', 'Odense billet', 85),
(1, 2, 'Etoro', 'Aktier', 1000),
(1, 2, 'EasyPark', 'Parkering', 22.83),
(1, 2, 'Ronja', '?', 492),
(1, 2, 'Asra', 'Frisør', 150),
(1, 2, 'Bini', 'MadKlubben', 189),
(1, 2, 'Rued', 'PC & Padel', 1060),
(1, 2, 'EasyPark', 'Parkering', 31.25),
(1, 2, 'Etoro', 'Aktier', 500),
(1, 2, 'DAO', 'Pakke', 54),
(1, 2, 'POPP Photo', 'Julegave', 98),
(1, 2, 'Displate', 'afmeld', 60.45),
(1, 2, 'Normal', 'pakkeleg', 114),
(1, 2, 'SuperBrugsen', 'Mel', 500),
(1, 2, 'EasyPark', 'Parkering', 20),
(1, 2, 'Chromecast', 'Julegave', 280),
(1, 2, 'Alibaba', 'OP7 Pro', 345),
(1, 2, 'Sauna Gus', '', 40),
(1, 2, 'FlixBus', 'Tyskland', 500),
(1, 2, 'Apcoa', 'Parkering', 500)


-- @block
INSERT INTO Expense (monthEconomyId, etype, ename, enote, eamount)
VALUES 
(2, 1, 'Test', 'Odense billet', 0),
(2, 1, 'Test', 'Aktier', 0),
(2, 1, 'Test', 'Parkering', 0),
(2, 1, 'Test', '?', 0)

-- @block

CREATE TABLE Purchase (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT,
     etype INT(1) NOT NULL,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)






-- @block
CREATE TABLE Sell (
     id INT PRIMARY KEY AUTO_INCREMENT,
     incomeId INT,
     pname VARCHAR(255) NOT NULL,
     pnote TEXT,
     pamount DECIMAL(10, 2) NOT NULL,
     FOREIGN KEY (incomeId) REFERENCES Income(id)
)


-- @block
INSERT INTO Income (monthEconomyId, etype, ename, enote, eamount)
VALUES (1, 1, 'SU', '', 4774)

-- @block
INSERT INTO Income (monthEconomyId, etype, ename, enote, eamount) 
VALUES 
(1, 2, 'Grafikkort', 'RTX 960', 380),
(1, 2, 'CPU', 'Ryzen 3500', 380),
(1, 2, 'Grafikkort', 'Radeon 5700XT', 1200),
(1, 2, 'Motherboard', 'Asus Rog', 400),
(1, 2, 'Wacom', 'Tablet', 250),
(1, 2, 'Rasp PI', '', 600);


-- @block
CREATE TABLE Expenses (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)

-- @block
CREATE TABLE Purchases (
     id INT PRIMARY KEY AUTO_INCREMENT,
     expensesId INT,
     pname VARCHAR(255) NOT NULL,
     pnote TEXT,
     pamount DECIMAL(10, 2) NOT NULL,
     FOREIGN KEY (expensesId) REFERENCES Expenses(id)
)








     -- @block
     --Insert multiple
     --INSERT INTO User (email,bio,country)
     --VALUES ('John@john.dk', 'That ma name batch', 'DK'), ('email', 'osv', 'NO')
     --Get data
     --SELECT * FROM Users;
     --Sammenflet Tables
     --CREATE TABLE Rooms(
     --     id INT AUTO_INCREMENT,
     --     street VARCHAR(255),
     --     --(Foreign) ID Of user who owns the room
     --     owner_id INT NOT NULL,
     --     PRIMARY KEY (),
     --     FOREIGN KEY (owner_id) REFERENCES Users(id)
     --)
     --INSERT rum pa samme Users(id)
     --INSERT INTO Rooms (owner_id, street)
     --VALUES
     --(1, 'street1')
     --(1, 'street2')
     --(1, 'street3')