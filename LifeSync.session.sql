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
          'Januar',
          2024
     ) 

     -- @block
INSERT INTO MonthEconomyFred (monthName, monthYear)
VALUES (
          'Januar',
          2024
     ) 
     
-- @block 
ALTER TABLE Journaling MODIFY bedTime TIME;
ALTER TABLE Journaling MODIFY wakeUpTime TIME;

-- @block
CREATE TABLE Users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     username VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
) 

-- @block
CREATE TABLE UserEnvironmentValues (
     id INT PRIMARY KEY AUTO_INCREMENT,
     userId INT NOT NULL,
     habiticaID VARCHAR(255),
     habiticaToken VARCHAR(255),
     traktClientId VARCHAR(255),
     traktClientSecret VARCHAR(255),
     TMDBApiKey VARCHAR(255),
     YouTubeApiKey VARCHAR(255),
     YouTubePlaylistId VARCHAR(255),
     FOREIGN KEY (userId) REFERENCES Users(id)
)

-- @block
INSERT INTO UserEnvironmentValues (userId, habiticaID, habiticaToken, traktClientId, traktClientSecret, TMDBApiKey, YouTubeApiKey, YouTubePlaylistId)
VALUES (
          2,
          '',
          '',
          '',
          '',
          '',
          '',
          ''
          )

-- @block
ALTER TABLE MonthEconomy ADD COLUMN userId INT NOT NULL DEFAULT 1;

-- @block
ALTER TABLE Expense ADD COLUMN userId INT NOT NULL DEFAULT 1;

-- @block
ALTER TABLE Users ADD COLUMN loginCounter INT NOT NULL DEFAULT 0;

-- @block
ALTER TABLE Users DROP COLUMN firstLogin;

-- @block
INSERT INTO Users (username, password)
VALUES (
          'fredWard',
          'fredWard'
)


-- @block
ALTER TABLE BookShelf ADD COLUMN userId INT;

-- @block
UPDATE BookShelf SET userId = 1;


-- @block
CREATE TABLE JournalingFred (
     id INT PRIMARY KEY AUTO_INCREMENT,
     journalDate DATETIME NOT NULL,
     sleepScore INT(1) NOT NULL,
     bedTime DATETIME NOT NULL,
     wakeUpTime DATETIME NOT NULL,
     sleepNote TEXT,
     moodScore INT(1) NOT NULL,
     moodNote TEXT,
     journalNote TEXT,
     firstGratitude TEXT,
     secondGratitude TEXT
)

-- @block
INSERT INTO JournalingFred (journalDate, sleepScore, bedTime, wakeUpTime, sleepNote, moodScore, moodNote, journalNote, firstGratitude, secondGratitude)
VALUES (
          '2024-01-05 00:00:00',
          5,
          '2024-01-04 22:00:00',
          '2024-01-05 06:00:00',
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet', 
          5,
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
     )


-- @block
CREATE TABLE MonthEconomyFred (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthName VARCHAR(255),
     monthYear INT(4)
)

-- @block

CREATE TABLE ExpenseFred (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT NOT NULL,
     eyear INT(4) NOT NULL,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     etype INT NOT NULL,
     ecategory VARCHAR(255) NOT NULL,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)

-- @block

CREATE TABLE BookShelf (
     id INT PRIMARY KEY AUTO_INCREMENT,
     bookName VARCHAR(255) NOT NULL,
     bookRating INT(1) NOT NULL,
     bookRead BOOLEAN NOT NULL,
     bookReadYear INT(4),
     imgURL VARCHAR(255)
)

-- @block
INSERT INTO BookShelf (bookName, bookRating, bookRead, bookReadYear, imgURL)
VALUES 
('Essentialism', 5, true, 2023, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1403165375i/18077875.jpg'),
('Atomic Habits', 5, true, 2023, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg')

-- @block

CREATE TABLE BookNote (
     id INT PRIMARY KEY AUTO_INCREMENT,
     bookShelfId INT NOT NULL,
     bookNote TEXT,
     FOREIGN KEY (bookShelfId) REFERENCES BookShelf(id)
)

-- @block
INSERT INTO BookNote (bookShelfId, bookNote)
VALUES 
(2, '222232323loresdfm ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit dsafamet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet')

-- @block
INSERT INTO Expense (monthEconomyId, eyear, ename, enote, etype, ecategory, eamount)
VALUES 
(1, 2023, 'Tryg', '', 1, 'Forsikringer', 323),
(1, 2023, 'YouTube', '', 1, 'Software & Apps', 5.73),
(1, 2023, 'Husleje', '', 1, 'Bolig', 4075),
(1, 2023, 'Mad', '', 1, 'Mad & Takeaway', 1000),
(1, 2023, 'Benzin', '', 1, 'Transport', 750),
(1, 2023, 'Rejsekonto', '', 1, 'Opsparing', 250),
(1, 2023, 'Klatreklub', '', 1, 'Fitness & Sundhed', 150),
(1, 2023, 'PureGym', '', 1, 'Fitness & Sundhed', 358),
(1, 2023, 'EWII', '', 1, 'Mobil & Internet', 266.5),
(1, 2023, 'NetFlix', '', 1, 'Software & Apps', 36),
(1, 2023, 'Lebara', '', 1, 'Mobil & Internet', 19)


-- @block
INSERT INTO ExpenseFred (monthEconomyId, eyear, ename, enote, etype, ecategory, eamount)
VALUES 
(1, 2024, 'Steroids', 'gainz', 2, 'Personlig Pleje', 150)


-- MD EXPENSES
-- @block
INSERT INTO Expense (monthEconomyId, eyear, ename, enote, etype, ecategory, eamount)
VALUES 
(3, 2023, 'DSB', 'Odense billet', 2, 'Transport', 85),
(3, 2023, 'EasyPark', 'Parkering', 2, 'Transport', 22.83),
(3, 2023, 'Ronja', '?', 2, 'Køb', 492),
(3, 2023, 'Asra', 'Frisør', 2, 'Personlig Pleje', 150)


-- @block

(1, 2023, 'Bini', 'MadKlubben', 2, 'Mad & Takeaway', 189),
(1, 2023, 'Rued', 'PC', 2, 'Lån & Afdrag', 1000),
(1, 2023, 'EasyPark', 'Parkering', 2, 'Transport', 31.25),
(1, 2023, 'DAO', 'Pakke', 2, 'Køb', 54),
(1, 2023, 'POPP Photo', 'Julegave', 2, 'Gaver', 98),
(1, 2023, 'Displate', 'afmeld', 2, 'Køb', 60.45),
(1, 2023, 'Normal', 'pakkeleg', 2, 'Gaver', 114),
(1, 2023, 'EasyPark', 'Parkering', 2, 'Transport', 20),
(1, 2023, 'Chromecast', 'Julegave', 2, 'Gaver', 280),
(1, 2023, 'Alibaba', 'OP7 Pro', 2, 'Elektronik', 345),
(1, 2023, 'Sauna Gus', '', 2, 'Fitness & Sundhed', 40),
(1, 2023, 'FlixBus', 'Tyskland', 2, 'Transport', 500),
(1, 2023, 'Apcoa', 'Parkering', 2, 'Transport', 15) 



-- @block

CREATE TABLE IncomeFred (
     id INT PRIMARY KEY AUTO_INCREMENT,
     monthEconomyId INT NOT NULL,
     eyear INT(4) NOT NULL,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     etype INT NOT NULL,
     ecategory VARCHAR(255) NOT NULL,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)

-- @block
INSERT INTO Income (monthEconomyId, eyear, ename, enote, etype, ecategory, eamount)
VALUES (15, 2024, 'SU', '', 1, 'Løn', 5996)

-- @block

INSERT INTO Income (monthEconomyId, eyear, ename, enote, etype, ecategory, eamount) 
VALUES 
(1, 2023, 'Grafikkort', 'RTX 960', 2, 'Salg', 380),
(1, 2023, 'CPU', 'Ryzen 3500', 2, 'Salg', 380),
(1, 2023, 'Grafikkort', 'Radeon 5700XT', 2, 'Salg', 1200),
(1, 2023, 'Motherboard', 'Asus Rog', 2, 'Salg', 400),
(1, 2023, 'Wacom', 'Tablet', 2, 'Salg', 250),
(1, 2023, 'Rasp PI', '', 2, 'Salg', 600);

-- @block
-- 1 = Fast, 2 = Other

-- Indkomst -- 1 = Løn, 2 = investering, 3 = Salg, 4 = gaver og arv, 5 Skatte refussioner, 6 = Andet

-- @block

SELECT * FROM Income WHERE eyear = 2023

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
     --Hvilken måned
     monthEconomyId INT,
     ename VARCHAR(255) NOT NULL,
     enote TEXT,
     -- 1 = Fast, 2 = MD
     etype INT NOT NULL,
     --Hvilken kategori
     ecategory VARCHAR(255) NOT NULL,
     eamount DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (monthEconomyId) REFERENCES MonthEconomy(id)
)

-- FASTE EXPENSES



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