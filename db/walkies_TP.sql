DROP DATABASE IF EXISTS walkies_web;
CREATE DATABASE IF NOT EXISTS walkies_web;
USE walkies_web;


DROP TABLE IF EXISTS users;

CREATE TABLE users (

	user_id INT NOT NULL auto_increment,
	user_email VARCHAR(40),
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    gender ENUM ('M','F'),
    date_of_birth DATE,
    addr1 VARCHAR(40),
    addr2 VARCHAR(40),
    zip VARCHAR(40),
    phone_number VARCHAR(15),
    
    PRIMARY KEY (user_id)
    
    );