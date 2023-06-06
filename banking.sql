-- 6 June 2023 12:22:10 AM
  -- 6 June 2023 12:23:33 AM
	CREATE TABLE accounts (
	id INTEGER NOT NULL AUTO_INCREMENT,
	aadharNo INTEGER(255),
	accountHolder VARCHAR(255),
	accountNumber INTEGER(255),
	accountType VARCHAR(255),
	balanceAmount INTEGER(255) DEFAULT 0,
	date DATE,
   	PRIMARY KEY (id))


	-- 5 June 2023 6:29:50 PM
	CREATE TABLE deposite (
	id INTEGER NOT NULL AUTO_INCREMENT,
	accountNumber INTEGER(255),
	balanceAmount INTEGER(255),
	deposite INTEGER(255),
    PRIMARY KEY (id))

	-- 5 June 2023 6:52:50 PM
ALTER TABLE `banking`.`deposite`
ADD COLUMN `date` date NULL AFTER `deposite`;


-- 5 June 2023 7:17:35 PM
   	CREATE TABLE withdrawl (
	id INTEGER NOT NULL AUTO_INCREMENT,
	accountNumber INTEGER(255),
	balanceAmount INTEGER(255),
	withdrawl INTEGER(255),
	date DATE,
    PRIMARY KEY (id))

	-- 5 June 2023 10:32:49 PM
    CREATE TABLE loan (
	id INTEGER NOT NULL AUTO_INCREMENT,
	accountNumber INTEGER(255),
	loanApply VARCHAR(255),
	approval VARCHAR(255) DEFAULT "pending",
	date DATE,
    PRIMARY KEY (id))

	CREATE TABLE log (
	id INTEGER NOT NULL AUTO_INCREMENT,
	accountNumber INTEGER(255),
	approval VARCHAR(255),
	date DATE,
    PRIMARY KEY (id))