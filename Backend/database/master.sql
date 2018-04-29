-- --------------------------------------------------------
-- Host:                         139.5.146.59
-- Server version:               5.7.21 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for coursetiny
CREATE DATABASE IF NOT EXISTS `coursetiny` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `coursetiny`;

-- Dumping structure for table coursetiny.banks
CREATE TABLE IF NOT EXISTS `banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `en` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `th` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `course_status_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  KEY `course_status_id` (`course_status_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`course_status_id`) REFERENCES `course_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for view coursetiny.course_details
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `course_details` (
	`id` INT(11) NOT NULL,
	`title` VARCHAR(128) NOT NULL COLLATE 'utf8_unicode_ci',
	`cover` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`start_date` DATE NOT NULL,
	`end_date` DATE NOT NULL,
	`location` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`description` TEXT NOT NULL COLLATE 'utf8_unicode_ci',
	`tickets` MEDIUMTEXT NULL COLLATE 'utf8mb4_bin',
	`user` LONGTEXT NULL COLLATE 'utf8mb4_bin'
) ENGINE=MyISAM;

-- Dumping structure for table coursetiny.course_status
CREATE TABLE IF NOT EXISTS `course_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.course_tickets
CREATE TABLE IF NOT EXISTS `course_tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `price` decimal(20,2) NOT NULL DEFAULT '0.00',
  `course_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_tickets_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.marital_status
CREATE TABLE IF NOT EXISTS `marital_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `en` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `th` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.name_titles
CREATE TABLE IF NOT EXISTS `name_titles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `en` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `th` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vat` decimal(20,2) NOT NULL DEFAULT '0.00',
  `total_price_vat_incl` decimal(20,2) NOT NULL DEFAULT '0.00',
  `total_price_vat_excl` decimal(20,2) NOT NULL DEFAULT '0.00',
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expired_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total_quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  KEY `order_status_id` (`order_status_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for view coursetiny.order_details
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `order_details` (
	`id` INT(11) NOT NULL,
	`email` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`first_name` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`last_name` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`mobile_number` VARCHAR(32) NULL COLLATE 'utf8_unicode_ci',
	`vat` DECIMAL(20,2) NOT NULL,
	`total_price_vat_incl` DECIMAL(20,2) NOT NULL,
	`total_price_vat_excl` DECIMAL(20,2) NOT NULL,
	`total_quantity` INT(11) NOT NULL,
	`user_id` INT(11) NOT NULL,
	`course_id` INT(11) NOT NULL,
	`order_status_id` INT(11) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`expired_at` TIMESTAMP NOT NULL,
	`title` VARCHAR(128) NULL COLLATE 'utf8_unicode_ci',
	`cover` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`start_date` DATE NULL,
	`end_date` DATE NULL,
	`location` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for table coursetiny.order_payment
CREATE TABLE IF NOT EXISTS `order_payment` (
  `order_id` int(11) NOT NULL,
  `proof_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_brand` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_expiration` char(7) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_holder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_method` enum('bankwire','credit_card') COLLATE utf8_unicode_ci DEFAULT NULL,
  `transfer_date` timestamp NULL DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `order_payment_ibfk_2` (`bank_id`),
  CONSTRAINT `order_payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_payment_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.order_status
CREATE TABLE IF NOT EXISTS `order_status` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.order_tickets
CREATE TABLE IF NOT EXISTS `order_tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `course_ticket_id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal(20,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_tickets_ibfk_1` (`order_id`),
  KEY `order_tickets_ibfk_2` (`course_ticket_id`),
  CONSTRAINT `order_tickets_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_tickets_ibfk_2` FOREIGN KEY (`course_ticket_id`) REFERENCES `course_tickets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for view coursetiny.order_ticket_quantity
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `order_ticket_quantity` (
	`id` INT(11) NOT NULL,
	`course_id` INT(11) NOT NULL,
	`name` VARCHAR(64) NOT NULL COLLATE 'utf8_unicode_ci',
	`price` DECIMAL(20,2) NOT NULL,
	`quantity` INT(11) NOT NULL,
	`reserved_ticket_count` BIGINT(21) NULL,
	`remaining` BIGINT(22) NULL
) ENGINE=MyISAM;

-- Dumping structure for table coursetiny.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `sex` enum('male','female') COLLATE utf8_unicode_ci NOT NULL,
  `mobile_number` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile_photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `about_me` text COLLATE utf8_unicode_ci,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `activation_key` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_token` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_validity` datetime DEFAULT NULL,
  `has_basic_info` tinyint(1) NOT NULL DEFAULT '0',
  `has_edu_exp_info` tinyint(1) NOT NULL DEFAULT '0',
  `has_id_card_info` tinyint(1) NOT NULL DEFAULT '0',
  `has_bank_account_info` tinyint(1) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.user_bank
CREATE TABLE IF NOT EXISTS `user_bank` (
  `user_id` int(11) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `branch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `account_no` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `book_photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `bank_id` (`bank_id`),
  CONSTRAINT `user_bank_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_bank_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.user_education
CREATE TABLE IF NOT EXISTS `user_education` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `university` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `facility` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `degree` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `education_photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_education_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.user_experience
CREATE TABLE IF NOT EXISTS `user_experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `position` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `startMonth` int(11) NOT NULL,
  `startYear` int(11) NOT NULL,
  `endMonth` int(11) DEFAULT NULL,
  `endYear` int(11) DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_experience_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table coursetiny.user_id_card
CREATE TABLE IF NOT EXISTS `user_id_card` (
  `user_id` int(11) NOT NULL,
  `number` varchar(13) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `title_id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `marital_status_id` int(11) NOT NULL,
  `current_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `id_card_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `id_card_photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `title_id` (`title_id`),
  KEY `marital_status_id` (`marital_status_id`),
  CONSTRAINT `user_id_card_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_id_card_ibfk_2` FOREIGN KEY (`title_id`) REFERENCES `name_titles` (`id`),
  CONSTRAINT `user_id_card_ibfk_3` FOREIGN KEY (`marital_status_id`) REFERENCES `marital_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for view coursetiny.user_profile
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `user_profile` (
	`id` INT(11) NOT NULL,
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`username` VARCHAR(128) NOT NULL COLLATE 'utf8_unicode_ci',
	`first_name` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`last_name` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`birthday` DATE NULL,
	`sex` ENUM('male','female') NOT NULL COLLATE 'utf8_unicode_ci',
	`mobile_number` VARCHAR(13) NULL COLLATE 'utf8_unicode_ci',
	`profile_photo` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`about_me` TEXT NULL COLLATE 'utf8_unicode_ci',
	`website` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`active` TINYINT(1) NOT NULL,
	`education` LONGTEXT NULL COLLATE 'utf8mb4_bin',
	`experience` LONGTEXT NULL COLLATE 'utf8mb4_bin',
	`skills` LONGTEXT NULL COLLATE 'utf8mb4_bin',
	`id_card_number` VARCHAR(13) NULL COLLATE 'utf8_unicode_ci',
	`id_card_title_id` INT(11) NULL,
	`id_card_first_name` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`id_card_last_name` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`id_card_marital_status_id` INT(11) NULL,
	`id_card_current_address` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`id_card_address` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`id_card_photo` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`bank_id` INT(11) NULL,
	`branch` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`account_no` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci',
	`book_photo` VARCHAR(255) NULL COLLATE 'utf8_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for table coursetiny.user_skills
CREATE TABLE IF NOT EXISTS `user_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for view coursetiny.course_details
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `course_details`;
CREATE SQL SECURITY DEFINER VIEW `course_details` AS select `c`.`id` AS `id`,`c`.`title` AS `title`,`c`.`cover` AS `cover`,`c`.`start_date` AS `start_date`,`c`.`end_date` AS `end_date`,`c`.`location` AS `location`,`c`.`description` AS `description`,`ct`.`tickets` AS `tickets`,`u`.`u_profile` AS `user` from ((`coursetiny`.`courses` `c` left join (select `ct`.`course_id` AS `course_id`,concat('[',group_concat(json_object('id',`ct`.`id`,'name',`ct`.`name`,'detail',`ct`.`detail`,'start_date',`ct`.`start_date`,'end_date',`ct`.`end_date`,'price',`ct`.`price`,'quantity',`ct`.`quantity`) separator ','),']') AS `tickets` from `coursetiny`.`course_tickets` `ct` group by `ct`.`course_id`) `ct` on((`c`.`id` = `ct`.`course_id`))) left join (select `u`.`id` AS `id`,concat('[',json_object('id',`u`.`id`,'firstName',`u`.`first_name`,'lastName',`u`.`last_name`),']') AS `u_profile` from `coursetiny`.`users` `u`) `u` on((`u`.`id` = `c`.`user_id`)));

-- Dumping structure for view coursetiny.order_details
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `order_details`;
CREATE SQL SECURITY DEFINER VIEW `order_details` AS select `o`.`id` AS `id`,`o`.`email` AS `email`,`o`.`first_name` AS `first_name`,`o`.`last_name` AS `last_name`,`o`.`mobile_number` AS `mobile_number`,`o`.`vat` AS `vat`,`o`.`total_price_vat_incl` AS `total_price_vat_incl`,`o`.`total_price_vat_excl` AS `total_price_vat_excl`,`o`.`total_quantity` AS `total_quantity`,`o`.`user_id` AS `user_id`,`o`.`course_id` AS `course_id`,`o`.`order_status_id` AS `order_status_id`,`o`.`created_at` AS `created_at`,`o`.`expired_at` AS `expired_at`,`c`.`title` AS `title`,`c`.`cover` AS `cover`,`c`.`start_date` AS `start_date`,`c`.`end_date` AS `end_date`,`c`.`location` AS `location` from (`orders` `o` left join `courses` `c` on((`o`.`course_id` = `c`.`id`)));

-- Dumping structure for view coursetiny.order_ticket_quantity
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `order_ticket_quantity`;
CREATE SQL SECURITY DEFINER VIEW `order_ticket_quantity` AS select `ct`.`id` AS `id`,`ct`.`course_id` AS `course_id`,`ct`.`name` AS `name`,`ct`.`price` AS `price`,`ct`.`quantity` AS `quantity`,coalesce(`tmp`.`reserved_ticket_count`,0) AS `reserved_ticket_count`,(`ct`.`quantity` - coalesce(`tmp`.`reserved_ticket_count`,0)) AS `remaining` from (`coursetiny`.`course_tickets` `ct` left join (select `ot`.`course_ticket_id` AS `course_ticket_id`,count(0) AS `reserved_ticket_count` from (`coursetiny`.`order_tickets` `ot` left join `coursetiny`.`orders` `o` on((`ot`.`order_id` = `o`.`id`))) where ((`o`.`order_status_id` <> 1) or ((`o`.`expired_at` > now()) and (`o`.`order_status_id` = 1))) group by `ot`.`course_ticket_id`) `tmp` on((`ct`.`id` = `tmp`.`course_ticket_id`)));

-- Dumping structure for view coursetiny.user_profile
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `user_profile`;
CREATE SQL SECURITY DEFINER VIEW `user_profile` AS (select `u`.`id` AS `id`,`u`.`email` AS `email`,`u`.`username` AS `username`,`u`.`first_name` AS `first_name`,`u`.`last_name` AS `last_name`,`u`.`birthday` AS `birthday`,`u`.`sex` AS `sex`,`u`.`mobile_number` AS `mobile_number`,`u`.`profile_photo` AS `profile_photo`,`u`.`about_me` AS `about_me`,`u`.`website` AS `website`,`u`.`active` AS `active`,coalesce(`uedu`.`education`,'[]') AS `education`,coalesce(`uexp`.`experience`,'[]') AS `experience`,coalesce(`uskill`.`skills`,'[]') AS `skills`,`uid`.`number` AS `id_card_number`,`uid`.`title_id` AS `id_card_title_id`,`uid`.`first_name` AS `id_card_first_name`,`uid`.`last_name` AS `id_card_last_name`,`uid`.`marital_status_id` AS `id_card_marital_status_id`,`uid`.`current_address` AS `id_card_current_address`,`uid`.`id_card_address` AS `id_card_address`,`uid`.`id_card_photo` AS `id_card_photo`,`ubank`.`bank_id` AS `bank_id`,`ubank`.`branch` AS `branch`,`ubank`.`account_no` AS `account_no`,`ubank`.`book_photo` AS `book_photo` from (((((`coursetiny`.`users` `u` left join (select `uedu`.`user_id` AS `user_id`,concat('[',group_concat(json_object('id',`uedu`.`id`,'university',`uedu`.`university`,'facility',`uedu`.`facility`,'degree',`uedu`.`degree`,'educationPhoto',`uedu`.`education_photo`) separator ','),']') AS `education` from `coursetiny`.`user_education` `uedu` group by `uedu`.`user_id`) `uedu` on((`u`.`id` = `uedu`.`user_id`))) left join (select `uexp`.`user_id` AS `user_id`,concat('[',group_concat(json_object('id',`uexp`.`id`,'company',`uexp`.`company`,'position',`uexp`.`position`,'startMonth',`uexp`.`startMonth`,'startYear',`uexp`.`startYear`,'endMonth',`uexp`.`endMonth`,'endYear',`uexp`.`endYear`,'currentCompany',`uexp`.`is_current`) separator ','),']') AS `experience` from `coursetiny`.`user_experience` `uexp` group by `uexp`.`user_id`) `uexp` on((`u`.`id` = `uexp`.`user_id`))) left join (select `uskill`.`user_id` AS `user_id`,concat('[',group_concat(json_object('id',`uskill`.`id`,'name',`uskill`.`name`,'level',`uskill`.`level`) separator ','),']') AS `skills` from `coursetiny`.`user_skills` `uskill` group by `uskill`.`user_id`) `uskill` on((`u`.`id` = `uskill`.`user_id`))) left join `coursetiny`.`user_id_card` `uid` on((`uid`.`user_id` = `u`.`id`))) left join `coursetiny`.`user_bank` `ubank` on((`ubank`.`user_id` = `u`.`id`))));

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
