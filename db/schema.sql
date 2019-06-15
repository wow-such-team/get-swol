CREATE DATABASE workout_db;
USE workout_db;

CREATE TABLE exercises
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    muscles_gross VARCHAR(255) NOT NULL,
    muscles_fine VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users
(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);