-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alertas`
--

DROP TABLE IF EXISTS `alertas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alertas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(200) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT (now()),
  `descripcion` varchar(300) NOT NULL,
  `id_encuestas` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_encuestas` (`id_encuestas`),
  CONSTRAINT `alertas_ibfk_1` FOREIGN KEY (`id_encuestas`) REFERENCES `encuestas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alertas`
--

LOCK TABLES `alertas` WRITE;
/*!40000 ALTER TABLE `alertas` DISABLE KEYS */;
/*!40000 ALTER TABLE `alertas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuestas`
--

DROP TABLE IF EXISTS `encuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encuestas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT (now()),
  `fecha_modificacion` date DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `estado` varchar(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `encuestas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuestas`
--

LOCK TABLES `encuestas` WRITE;
/*!40000 ALTER TABLE `encuestas` DISABLE KEYS */;
INSERT INTO `encuestas` VALUES (93,'Encuestas','Las encuestas son herramientas de búsqueda de información que contienen un conjunto de preguntas y que son utilizadas por investigadores, compañías, gobiernos, entre otros.','2023-11-29 04:51:28',NULL,29,'desactivado'),(94,'Titulo Prueba','Descripcion Prueba','2023-11-29 05:42:47',NULL,29,'activado');
/*!40000 ALTER TABLE `encuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informes`
--

DROP TABLE IF EXISTS `informes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(300) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT (now()),
  `id_encuestas` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_encuestas` (`id_encuestas`),
  CONSTRAINT `informes_ibfk_1` FOREIGN KEY (`id_encuestas`) REFERENCES `encuestas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informes`
--

LOCK TABLES `informes` WRITE;
/*!40000 ALTER TABLE `informes` DISABLE KEYS */;
/*!40000 ALTER TABLE `informes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` varchar(300) NOT NULL,
  `id_encuestas` int NOT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_encuestas` (`id_encuestas`),
  CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_encuestas`) REFERENCES `encuestas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (65,'¿Cuántas horas por semana cursa?',93,'abierta'),(66,'Indique su edad.',93,'abierta'),(67,'¿En qué año comenzó a estudiar?',93,'abierta'),(68,'¿Cuál es su carrera?',93,'cerrada'),(69,'¿Cuántas asignaturas aprobó?',93,'cerrada'),(70,'Como es tu dia?',94,'abierta'),(71,'Que dia es hoy?',94,'cerrada');
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas_abiertas`
--

DROP TABLE IF EXISTS `respuestas_abiertas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas_abiertas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` varchar(300) NOT NULL,
  `fecha_respuesta` timestamp NOT NULL DEFAULT (now()),
  `id_preguntas` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_preguntas` (`id_preguntas`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `respuestas_abiertas_ibfk_1` FOREIGN KEY (`id_preguntas`) REFERENCES `preguntas` (`id`),
  CONSTRAINT `respuestas_abiertas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas_abiertas`
--

LOCK TABLES `respuestas_abiertas` WRITE;
/*!40000 ALTER TABLE `respuestas_abiertas` DISABLE KEYS */;
INSERT INTO `respuestas_abiertas` VALUES (94,'Excelente','2023-11-29 05:48:24',70,31);
/*!40000 ALTER TABLE `respuestas_abiertas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas_cerradas`
--

DROP TABLE IF EXISTS `respuestas_cerradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas_cerradas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` varchar(300) NOT NULL,
  `fecha_respuesta` timestamp NOT NULL DEFAULT (now()),
  `id_preguntas` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_preguntas` (`id_preguntas`),
  CONSTRAINT `respuestas_cerradas_ibfk_1` FOREIGN KEY (`id_preguntas`) REFERENCES `preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas_cerradas`
--

LOCK TABLES `respuestas_cerradas` WRITE;
/*!40000 ALTER TABLE `respuestas_cerradas` DISABLE KEYS */;
INSERT INTO `respuestas_cerradas` VALUES (29,'Ing. Sistemas','2023-11-29 04:52:32',68),(30,'Ing. Industrial','2023-11-29 04:52:39',68),(31,'1-2','2023-11-29 04:53:07',68),(32,'3-4','2023-11-29 04:53:12',68),(33,'5-6','2023-11-29 04:53:17',68),(34,'ninguna','2023-11-29 04:53:44',68),(35,'23','2023-11-29 05:43:36',71),(36,'24','2023-11-29 05:43:37',71),(37,'28','2023-11-29 05:43:44',71);
/*!40000 ALTER TABLE `respuestas_cerradas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `cedula` varchar(10) NOT NULL,
  `genero` varchar(30) DEFAULT NULL,
  `programa` varchar(100) NOT NULL,
  `dia_creacion` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (29,'Anderson','Guzman','anderson@gmail.com','proyecto','administrador',NULL,'2023','masculino','sistemas','2023-11-29 04:49:24'),(31,'Daniel','Martinez','dani@gmail.com','Proyecto1@','estudiante','2002-10-11','2025','masculino','Sistemas','2023-11-29 05:45:36');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_respuestas_cerradas`
--

DROP TABLE IF EXISTS `usuario_respuestas_cerradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_respuestas_cerradas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idRespuesta_cerrada` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRespuesta_cerrada` (`idRespuesta_cerrada`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `usuario_respuestas_cerradas_ibfk_1` FOREIGN KEY (`idRespuesta_cerrada`) REFERENCES `respuestas_cerradas` (`id`),
  CONSTRAINT `usuario_respuestas_cerradas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_respuestas_cerradas`
--

LOCK TABLES `usuario_respuestas_cerradas` WRITE;
/*!40000 ALTER TABLE `usuario_respuestas_cerradas` DISABLE KEYS */;
INSERT INTO `usuario_respuestas_cerradas` VALUES (15,37,31);
/*!40000 ALTER TABLE `usuario_respuestas_cerradas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29  1:30:06
