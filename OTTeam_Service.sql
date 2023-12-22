-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: OTTeam_Service
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `MovieReview`
--

DROP TABLE IF EXISTS `MovieReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MovieReview` (
  `reviewID` int(11) NOT NULL AUTO_INCREMENT,
  `DOCID` char(10) NOT NULL,
  `userCd` int(11) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `reviewComment` varchar(100) NOT NULL,
  `reviewDate` date NOT NULL,
  PRIMARY KEY (`reviewID`),
  KEY `FK_revList_movList_DOCID_idx` (`DOCID`),
  KEY `FK_dirList_usrInfo_DOCID_idx` (`userCd`),
  CONSTRAINT `FK_revList_movList_DOCID` FOREIGN KEY (`DOCID`) REFERENCES `movieList` (`DOCID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_revList_usrInfo_userCd` FOREIGN KEY (`userCd`) REFERENCES `userInfo` (`userCd`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `actorInfo`
--

DROP TABLE IF EXISTS `actorInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actorInfo` (
  `actorId` int(11) NOT NULL,
  `actorNm` varchar(45) NOT NULL,
  `actorEnNm` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`actorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `actorList`
--

DROP TABLE IF EXISTS `actorList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actorList` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `actorId` int(11) NOT NULL,
  `DOCID` char(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_movieList_DOCID_idx` (`DOCID`),
  KEY `FK_actList_actInfo_actorId_idx` (`actorId`),
  CONSTRAINT `FK_actList_actInfo_actorId` FOREIGN KEY (`actorId`) REFERENCES `actorInfo` (`actorId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_actList_movList_DOCID` FOREIGN KEY (`DOCID`) REFERENCES `movieList` (`DOCID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `directorInfo`
--

DROP TABLE IF EXISTS `directorInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directorInfo` (
  `directorId` int(11) NOT NULL,
  `directorNm` varchar(45) NOT NULL,
  `directorEnNm` varchar(45) NOT NULL,
  PRIMARY KEY (`directorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `directorList`
--

DROP TABLE IF EXISTS `directorList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directorList` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `directorId` int(11) NOT NULL,
  `DOCID` char(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_directorInfo_directorId_idx` (`directorId`),
  KEY `FK_movieList_DOCID_idx` (`DOCID`),
  CONSTRAINT `FK_dirList_dirInfo_directorId` FOREIGN KEY (`directorId`) REFERENCES `directorInfo` (`directorId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_dirList_movList_DOCID` FOREIGN KEY (`DOCID`) REFERENCES `movieList` (`DOCID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=540 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movieCache`
--

DROP TABLE IF EXISTS `movieCache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movieCache` (
  `findID` int(11) NOT NULL AUTO_INCREMENT,
  `findMovieNm` varchar(255) NOT NULL,
  `findMovieDate` date NOT NULL,
  PRIMARY KEY (`findID`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movieInfo`
--

DROP TABLE IF EXISTS `movieInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movieInfo` (
  `DOCID` char(10) NOT NULL,
  `prodYear` int(11) DEFAULT NULL,
  `nation` varchar(45) DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `rating` varchar(45) DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `posterUrl` longtext DEFAULT NULL,
  PRIMARY KEY (`DOCID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movieList`
--

DROP TABLE IF EXISTS `movieList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movieList` (
  `DOCID` char(10) NOT NULL,
  `title` longtext NOT NULL,
  `titleEng` longtext DEFAULT NULL,
  `titleOrg` longtext DEFAULT NULL,
  PRIMARY KEY (`DOCID`),
  CONSTRAINT `FK_movList_movInfo_DOCID` FOREIGN KEY (`DOCID`) REFERENCES `movieInfo` (`DOCID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `plotInfo`
--

DROP TABLE IF EXISTS `plotInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plotInfo` (
  `plotId` int(11) NOT NULL AUTO_INCREMENT,
  `plotLang` varchar(10) NOT NULL,
  `plotText` longtext NOT NULL,
  `DOCID` char(10) NOT NULL,
  PRIMARY KEY (`plotId`),
  KEY `FK_ploInfo_movList_DOCID_idx` (`DOCID`),
  CONSTRAINT `FK_ploInfo_movList_DOCID` FOREIGN KEY (`DOCID`) REFERENCES `movieList` (`DOCID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=987 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userInfo`
--

DROP TABLE IF EXISTS `userInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userInfo` (
  `userCd` int(11) NOT NULL AUTO_INCREMENT,
  `userMail` varchar(45) NOT NULL,
  `userPW` varchar(255) NOT NULL,
  `userName` varchar(45) NOT NULL,
  PRIMARY KEY (`userCd`,`userMail`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-22 13:48:22
