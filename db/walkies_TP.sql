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
    profile_image_url VARCHAR(40),
    walker ENUM ('N','Y'),
    
    PRIMARY KEY (user_id)
    
    );
    
    
    DROP TABLE IF EXISTS walk_now;
    
    CREATE TABLE walk_now (
    
    walkID INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    first_name VARCHAR(40),
    addr1 VARCHAR(40),
    pickup VARCHAR(40),
    dropoff VARCHAR(40),
    price VARCHAR(40),
    phone_number VARCHAR(20),
    profile_image_url VARCHAR(300),
    search_status ENUM ('N','Y'),
    walker_id INT(20),
    
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (walker_id) REFERENCES users (user_id),
    PRIMARY KEY (walkID)
    );
    
    CREATE TABLE walks_completed (
    
    walkID INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    first_name VARCHAR(40),
    addr1 VARCHAR(40),
    pickup VARCHAR(40),
    dropoff VARCHAR(40),
    price VARCHAR(40),
    phone_number VARCHAR(20),
    profile_image_url VARCHAR(300),
    date_completed DATE,
    walker_id INT(20),
    
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (walker_id) REFERENCES users (user_id),
    PRIMARY KEY (walkID)
    );
    
    
    
    DROP TABLE IF exists regular_walks;
    
    CREATE TABLE regular_walks (
    requestID INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    first_name VARCHAR(40),
    mon ENUM ('N','Y'),
    tue ENUM ('N','Y'),
    wed ENUM ('N','Y'),
    thu ENUM ('N','Y'),
    fri ENUM ('N','Y'),
    sat ENUM ('N','Y'),
    sun ENUM ('N','Y'),
    pickup VARCHAR(40),
    dropoff VARCHAR(40),
    addr1 VARCHAR(40),
    addr2 VARCHAR(40),
    zip VARCHAR(40),
    phone_number VARCHAR(40),
    price VARCHAR(40),
    profile_image_url VARCHAR(400),
    walk_status ENUM ('N','Y'),
    walker_id INT(20),
    
    FOREIGN KEY (user_id)  REFERENCES users (user_id),
    FOREIGN KEY (walker_id) REFERENCES users (user_id),
    PRIMARY KEY (requestID)
    
    
    );
    