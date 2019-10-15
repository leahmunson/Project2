-- Drops the userprofile_db if it already exists --
DROP DATABASE IF EXISTS userprofile_db;
-- Create a database called userprofile_db --
CREATE DATABASE userprofile_db;

USE userprofile_db;

-- Creates table in sql to store the user information --
CREATE TABLE user_info(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    username NVARCHAR(40) NOT NULL,
    password NVARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);
