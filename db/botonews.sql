-- Création d'un nouvelle base de donnée

CREATE DATABASE IF NOT EXISTS botonews;

-- Utilisation de cette base de donnée

USE botonews; 

DROP TABLE IF EXISTS `t_users`;
DROP TABLE IF EXISTS `t_news`;
DROP TABLE IF EXISTS `t_channels`;
DROP TABLE IF EXISTS `t_subscriptions`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_users` (
  `user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(12) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO t_users VALUES (NULL, 'AzeckoTest', 'AzeckoTest@gmail.com', 'https://google.com/AzeckoTest.jpg');


CREATE TABLE `t_news` (
  `new` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`new`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `t_channels` (
  `channel` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`channel`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `t_subscriptions` (
  `subscription` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `channel` int NOT NULL,
  `mode` varchar(255) DEFAULT NULL,  -- auto / digest (résumé)
  `what` varchar(255) DEFAULT NULL,  -- last 5 / delta 
  `frequency` varchar(255) DEFAULT NULL, -- daily, weekly-friday...
  `time` varchar(255) DEFAULT NULL, -- 16:00
  PRIMARY KEY (`subscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;