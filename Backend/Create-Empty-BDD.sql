SET NAMES utf8;

-- Suppression des tables si existent
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Articles;

-- Création de la table Users
CREATE TABLE Users (
  id SMALLINT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  pictureurl VARCHAR(255) DEFAULT NULL,
  outline VARCHAR(255) DEFAULT NULL,
  isadmin TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY(id),
  UNIQUE KEY ind_email (email)
) ENGINE=InnoDB;