--comment
-- @block 
CREATE TABLE Users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     email VARCHAR(255) NOT NULL UNIQUE,
     bio TEXT,
     country VARCHAR(2)
) --Insert into table
-- @block
INSERT INTO Users (email, bio, country)
VALUES (
          'Johhn@john.dk',
          'That ma name batch',
          'DK'
     ) 
     

-- @block
CREATE TABLE MonthEconomy (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthName VARCHAR(255),
     monthYear INT(4)
)


-- @block
CREATE TABLE 



-- @block

CREATE TABLE Income (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT,
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
DROP TABLE testTable;


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