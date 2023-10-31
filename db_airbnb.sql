/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Booking`;
CREATE TABLE `Booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomId` int DEFAULT NULL,
  `checkInDate` datetime DEFAULT NULL,
  `checkOutDate` datetime DEFAULT NULL,
  `guestNumber` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room` (`roomId`),
  KEY `user` (`userId`),
  CONSTRAINT `Booking_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Room` (`id`),
  CONSTRAINT `Booking_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Location`;
CREATE TABLE `Location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `locationName` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Review`;
CREATE TABLE `Review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `reviewDate` datetime DEFAULT NULL,
  `star` int DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Review_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Room` (`id`),
  CONSTRAINT `Review_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Room`;
CREATE TABLE `Room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomName` varchar(255) DEFAULT NULL,
  `guest` int DEFAULT NULL,
  `bedroom` int DEFAULT NULL,
  `bed` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `washingMachine` tinyint(1) DEFAULT NULL,
  `iron` tinyint(1) DEFAULT NULL,
  `television` tinyint(1) DEFAULT NULL,
  `airConditioner` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `stove` tinyint(1) DEFAULT NULL,
  `parkingLot` tinyint(1) DEFAULT NULL,
  `swimmingPool` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `locationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `guest` (`guest`),
  KEY `location` (`locationId`),
  CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `Location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Booking` (`id`, `roomId`, `checkInDate`, `checkOutDate`, `guestNumber`, `userId`) VALUES
(1, 1, '2023-10-27 00:00:00', '2023-10-28 00:00:00', 2, 1);
INSERT INTO `Booking` (`id`, `roomId`, `checkInDate`, `checkOutDate`, `guestNumber`, `userId`) VALUES
(2, 1, '2023-10-27 00:00:00', '2023-10-28 00:00:00', 3, 1);


INSERT INTO `Location` (`id`, `locationName`, `province`, `country`, `image`) VALUES
(1, 'Vung Tau', 'Ba Ria, Vung Tau', 'Viet Nam', '/public/img1698393981984_avt_meo.jpg');
INSERT INTO `Location` (`id`, `locationName`, `province`, `country`, `image`) VALUES
(2, 'Long Hai', 'Ba Ria, Vung Tau', 'Viet Nam', '/public/img1698394151557_avt_meo.jpg');


INSERT INTO `Review` (`id`, `roomId`, `userId`, `reviewDate`, `star`, `detail`) VALUES
(1, 1, 1, '2023-10-27 00:00:00', 4, 'test review');
INSERT INTO `Review` (`id`, `roomId`, `userId`, `reviewDate`, `star`, `detail`) VALUES
(3, 1, 1, '2023-10-27 00:00:00', 5, 'test review');
INSERT INTO `Review` (`id`, `roomId`, `userId`, `reviewDate`, `star`, `detail`) VALUES
(4, 3, 1, '2023-10-27 00:00:00', 5, 'test review');
INSERT INTO `Review` (`id`, `roomId`, `userId`, `reviewDate`, `star`, `detail`) VALUES
(5, 1, 3, '2023-10-27 00:00:00', 5, 'test review');

INSERT INTO `Room` (`id`, `roomName`, `guest`, `bedroom`, `bed`, `description`, `price`, `washingMachine`, `iron`, `television`, `airConditioner`, `wifi`, `stove`, `parkingLot`, `swimmingPool`, `image`, `locationId`) VALUES
(1, 'Sang xin min', 4, 1, 2, 'Phong sang xin min', 20, 1, 1, 1, 1, 1, 0, 1, 0, '/public/img1698398592270_avt_meo.jpg', 2);
INSERT INTO `Room` (`id`, `roomName`, `guest`, `bedroom`, `bed`, `description`, `price`, `washingMachine`, `iron`, `television`, `airConditioner`, `wifi`, `stove`, `parkingLot`, `swimmingPool`, `image`, `locationId`) VALUES
(3, 'Sang xin min', 4, 1, 2, 'Phong sang xin min', 20, 1, 1, 1, 1, 1, 0, 1, 0, NULL, 1);


INSERT INTO `User` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$bU15KhVdRkFx7FeTm3SVHeIO4rNKuLlmf.iTjftlG62rPO6znLw.u', '0123456789', '01/10/2001', 'male', 'Admin', 'http://localhost:8080/images/1698737945491_avt_meo.jpg');
INSERT INTO `User` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(3, 'User', 'user2@gmail.com', '$2b$10$SIAaqueVANc/VLK.0BXI9efkgQbimxo9MwmUN3h.WHB2JJleAwgYq', '0123456789', '01/10/2001', 'male', 'User', NULL);
INSERT INTO `User` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(5, 'Admin', 'admin2@gmail.com', '$2b$10$9rd9tl/cPB0V2m.AG3jiXuzi/LfW1gEA9bjKxSoDtRJATEW2CUnte', '0123456789', '01/10/2001', 'Male', 'Admin', NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;