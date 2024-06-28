CREATE DATABASE ng_games_db;
USE ng_games_db;
CREATE TABLE game(
Id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(180),
description VARCHAR(255),
image VARCHAR(200),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
RENAME TABLE game to games;
DESCRIBE games;







CREATE TABLE Gamers (
Id_Gamer int (11) not null AUTO_INCREMENT PRIMARY KEY,
name_Gamer varchar(50),
username_Gamer varchar (10),
password_Gamer varchar (20),
photo_Gamer varchar (200),
age_Gamer int (2),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
DESCRIBE Gamers;