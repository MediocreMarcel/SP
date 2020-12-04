-- --------------------------------------------------------
-- Host:                         192.168.1.19
-- Server Version:               10.3.25-MariaDB-0+deb10u1 - Raspbian 10
-- Server Betriebssystem:        debian-linux-gnueabihf
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportiere Datenbank Struktur für sp
CREATE DATABASE IF NOT EXISTS `sp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sp`;

-- Exportiere Struktur von Tabelle sp.contains
CREATE TABLE IF NOT EXISTS `contains` (
  `exam_id` int(8) NOT NULL,
  `question_id` int(8) NOT NULL,
  `points` float NOT NULL,
  PRIMARY KEY (`exam_id`,`question_id`),
  KEY `FK_contains_exams` (`exam_id`),
  KEY `FK_contains_questions` (`question_id`),
  CONSTRAINT `FK_contains_exams` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  CONSTRAINT `FK_contains_questions` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.exams
CREATE TABLE IF NOT EXISTS `exams` (
  `exam_id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `creation_date` date NOT NULL,
  `exam_date` date DEFAULT NULL,
  `status` enum('to_be_corrected','in_correction','in_creation','corrected','created','written') NOT NULL,
  PRIMARY KEY (`exam_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.is_corrected
CREATE TABLE IF NOT EXISTS `is_corrected` (
  `matr_nr` int(4) NOT NULL,
  `exam_id` int(8) NOT NULL,
  `question_id` int(8) NOT NULL,
  `criteria_id` int(8) NOT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `reached_points` float NOT NULL,
  `status` enum('pending','in_progress','corrected') NOT NULL,
  PRIMARY KEY (`matr_nr`,`exam_id`,`question_id`,`criteria_id`),
  KEY `FK_is_corrected_students` (`matr_nr`),
  KEY `FK_is_corrected_exams` (`exam_id`),
  KEY `FK_is_corrected_questions` (`question_id`),
  KEY `FK_is_corrected_rating_criteria` (`criteria_id`),
  CONSTRAINT `FK_is_corrected_exams` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  CONSTRAINT `FK_is_corrected_questions` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  CONSTRAINT `FK_is_corrected_rating_criteria` FOREIGN KEY (`criteria_id`) REFERENCES `rating_criteria` (`criteria_id`),
  CONSTRAINT `FK_is_corrected_students` FOREIGN KEY (`matr_nr`) REFERENCES `students` (`matr_nr`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.is_reading
CREATE TABLE IF NOT EXISTS `is_reading` (
  `module_id` int(4) NOT NULL,
  `user_id` int(6) NOT NULL,
  PRIMARY KEY (`module_id`,`user_id`),
  KEY `FK_isReading_modules` (`module_id`),
  KEY `FK_isReading_users` (`user_id`),
  CONSTRAINT `FK_isReading_modules` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`),
  CONSTRAINT `FK_isReading_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.modules
CREATE TABLE IF NOT EXISTS `modules` (
  `module_id` int(8) NOT NULL AUTO_INCREMENT,
  `course` varchar(50) DEFAULT NULL,
  `definition` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `question_text` varchar(5000) NOT NULL,
  `default_points` float NOT NULL,
  `short_name` varchar(20) NOT NULL,
  `module_id` int(8) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.rating_criteria
CREATE TABLE IF NOT EXISTS `rating_criteria` (
  `criteria_id` int(8) NOT NULL AUTO_INCREMENT,
  `possible_points` float NOT NULL,
  `criteria_text` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`criteria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.students
CREATE TABLE IF NOT EXISTS `students` (
  `matr_nr` int(6) NOT NULL,
  PRIMARY KEY (`matr_nr`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle sp.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(6) NOT NULL,
  `name` varchar(60) NOT NULL,
  `surname` varchar(60) NOT NULL,
  `password` varchar(64) NOT NULL,
  `mail` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabelle für den Benutzer';

-- Daten Export vom Benutzer nicht ausgewählt
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
