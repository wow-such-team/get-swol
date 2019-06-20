DROP DATABASE IF EXISTS workout_db;

CREATE DATABASE workout_db;
USE workout_db;

CREATE TABLE exercises
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    muscles VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users
(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE premadeWO (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    WOType ENUM("full body", "arms", "legs", "chest/shoulders/back", "core") NOT NULL,
    exerciseList VARCHAR(255) NOT NULL,
    numOfFavs INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
);