-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.4.17-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank Struktur für sp
CREATE DATABASE IF NOT EXISTS `sp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sp`;

-- Exportiere Struktur von Tabelle sp.contains
CREATE TABLE IF NOT EXISTS `contains` (
  `exam_id` int(8) NOT NULL,
  `question_id` int(8) NOT NULL,
  `points` float NOT NULL,
  `position` int(8) NOT NULL,
  PRIMARY KEY (`exam_id`,`question_id`),
  KEY `FK_contains_exams` (`exam_id`),
  KEY `FK_contains_questions` (`question_id`),
  CONSTRAINT `FK_contains_exams` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  CONSTRAINT `FK_contains_questions` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.contains: ~3 rows (ungefähr)
/*!40000 ALTER TABLE `contains` DISABLE KEYS */;
INSERT INTO `contains` (`exam_id`, `question_id`, `points`, `position`) VALUES
	(7, 3, 123, 0),
	(8, 5, 5, 1),
	(8, 6, 3, 0);
/*!40000 ALTER TABLE `contains` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.courses: ~7 rows (ungefähr)
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` (`course_id`, `course_name`) VALUES
	(1, 'Wirtschaftsinformatik (B.Sc.)'),
	(2, 'Informatik (B.Sc.)'),
	(3, 'Vermessung und Geoinformatik (B.Eng.)'),
	(4, 'Informationslogistik (B.Sc.)'),
	(5, 'Photogrammetry and Geoinformatics (M.Sc.)'),
	(6, 'Software Technology (M.Sc.)'),
	(7, 'Digitale Prozesse und Technologien (M.Sc.)');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.exams
CREATE TABLE IF NOT EXISTS `exams` (
  `exam_id` int(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `creation_date` date NOT NULL,
  `exam_date` date DEFAULT NULL,
  `status` enum('to_be_corrected','in_correction','in_creation','corrected','created','written') NOT NULL,
  `module_id` int(11) NOT NULL,
  `total_points` int(11) NOT NULL,
  PRIMARY KEY (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.exams: ~4 rows (ungefähr)
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` (`exam_id`, `title`, `creation_date`, `exam_date`, `status`, `module_id`, `total_points`) VALUES
	(1, 'SS 20', '2020-12-20', '2020-12-20', 'in_creation', 0, 120),
	(6, 'Prog 3 Examen SS20', '2020-12-21', '2020-12-20', 'in_creation', 13, 120),
	(7, 'Prog 3 SS21', '2021-01-06', '2021-08-23', 'corrected', 13, 120),
	(8, 'Prog 1 PVL', '2021-01-08', '2021-01-17', 'corrected', 17, 60),
	(9, 'Software Engineering', '2021-01-10', '2021-01-22', 'in_creation', 19, 100);
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle sp.is_corrected: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `is_corrected` DISABLE KEYS */;
/*!40000 ALTER TABLE `is_corrected` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle sp.is_reading: ~7 rows (ungefähr)
/*!40000 ALTER TABLE `is_reading` DISABLE KEYS */;
INSERT INTO `is_reading` (`module_id`, `user_id`) VALUES
	(13, 123456),
	(14, 123456),
	(16, 123456),
	(17, 123456),
	(18, 123456),
	(19, 123456),
	(20, 123456);
/*!40000 ALTER TABLE `is_reading` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.modules
CREATE TABLE IF NOT EXISTS `modules` (
  `module_id` int(8) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `definition` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.modules: ~7 rows (ungefähr)
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` (`module_id`, `course_id`, `definition`) VALUES
	(13, 1, 'Prog 3'),
	(14, 1, 'WI Projekt 2'),
	(16, 1, 'Prog 2'),
	(17, 1, 'Prog 1'),
	(18, 2, 'WI Projekt 1'),
	(19, 1, 'Software Engineering'),
	(20, 1, 'Software Modellierung');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `question_text` varchar(5000) DEFAULT NULL,
  `default_points` float NOT NULL,
  `short_name` varchar(20) DEFAULT NULL,
  `module_id` int(8) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.questions: ~4 rows (ungefähr)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`question_id`, `name`, `question_text`, `default_points`, `short_name`, `module_id`, `category`) VALUES
	(3, 'Test', 'text', 123, 'shortname', 13, 'Thema 2'),
	(4, 'Sortierverfahren Benennen', '<p>Nennen Sie <strong>ein </strong><em>Sortierverfahren</em></p>', 1, 'Sortierverfahren', 17, 'Sortieren'),
	(5, 'Sortieren nach Bubblesort', '<p>Sortieren Sie folgenden Array mithilfe des Bubblesorts:</p><pre class="ql-syntax" spellcheck="false">[9,4,6,7,2]\n</pre>', 5, 'Bubblesort', 17, 'Sortieren'),
	(6, 'Welchen Datentyp für welchen Wert?', '<p>Nennen Sie für folgende Daten einen passenden Datentyp:</p><ul><li>5,5</li><li>Hallo</li><li>y</li><li>42</li></ul>', 3, 'Datentyp zuordnen', 17, 'Datentyp zuordnen'),
	(7, 'Was kommen in die Diamond operatoren rein?', '<p>Was kommen in die Diamond operatoren rein?</p>', 1, 'generics', 17, 'Generics');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.rating_criteria
CREATE TABLE IF NOT EXISTS `rating_criteria` (
  `criteria_id` int(8) NOT NULL AUTO_INCREMENT,
  `possible_points` float NOT NULL,
  `criteria_text` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`criteria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.rating_criteria: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `rating_criteria` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating_criteria` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.students
CREATE TABLE IF NOT EXISTS `students` (
  `matr_nr` int(6) NOT NULL,
  PRIMARY KEY (`matr_nr`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle sp.students: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle sp.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(6) NOT NULL,
  `name` varchar(60) NOT NULL,
  `surname` varchar(60) NOT NULL,
  `password` varchar(64) NOT NULL,
  `mail` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabelle für den Benutzer';

-- Exportiere Daten aus Tabelle sp.users: ~2 rows (ungefähr)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `name`, `surname`, `password`, `mail`) VALUES
	(0, 'Felix', 'Dittrich', '*94BDCEBE19083CE2A1F959FD02F964C7AF4CFC29', NULL),
	(123456, 'Max', 'Mustermann', '*94BDCEBE19083CE2A1F959FD02F964C7AF4CFC29', 'testmail');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
