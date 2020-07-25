-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table dbeabsen.eabsen_absen
DROP TABLE IF EXISTS `eabsen_absen`;
CREATE TABLE IF NOT EXISTS `eabsen_absen` (
  `absen_id` int(11) NOT NULL AUTO_INCREMENT,
  `absen_waktu` timestamp NOT NULL DEFAULT current_timestamp(),
  `absen_mahasiswa` int(11) NOT NULL,
  `absen_pertemuan` int(11) NOT NULL,
  PRIMARY KEY (`absen_id`),
  UNIQUE KEY `absen_mahasiswa_absen_pertemuan` (`absen_mahasiswa`,`absen_pertemuan`),
  KEY `FK_absen_pertemuan` (`absen_pertemuan`),
  CONSTRAINT `FK_absen_login` FOREIGN KEY (`absen_mahasiswa`) REFERENCES `eabsen_login` (`login_id`),
  CONSTRAINT `FK_absen_pertemuan` FOREIGN KEY (`absen_pertemuan`) REFERENCES `eabsen_pertemuan` (`pertemuan_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=869 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_absen: ~13 rows (approximately)
DELETE FROM `eabsen_absen`;
/*!40000 ALTER TABLE `eabsen_absen` DISABLE KEYS */;
INSERT INTO `eabsen_absen` (`absen_id`, `absen_waktu`, `absen_mahasiswa`, `absen_pertemuan`) VALUES
	(6, '2020-04-10 21:29:01', 2, 17),
	(7, '2020-06-02 07:01:10', 2, 20),
	(12, '2020-06-26 10:37:10', 24, 28),
	(13, '2020-06-26 13:18:58', 26, 28),
	(14, '2020-06-27 10:41:49', 20, 28),
	(17, '2020-07-06 11:26:39', 20, 29),
	(18, '2020-07-06 21:16:43', 28, 29),
	(23, '2020-07-07 13:10:21', 2, 19),
	(43, '2020-07-07 13:18:03', 2, 16),
	(92, '2020-07-07 15:02:57', 20, 30),
	(197, '2020-07-07 15:03:50', 11, 30),
	(844, '2020-07-11 13:04:33', 11, 31),
	(868, '2020-07-11 20:39:38', 20, 31);
/*!40000 ALTER TABLE `eabsen_absen` ENABLE KEYS */;

-- Dumping structure for table dbeabsen.eabsen_kelas
DROP TABLE IF EXISTS `eabsen_kelas`;
CREATE TABLE IF NOT EXISTS `eabsen_kelas` (
  `kelas_id` int(5) NOT NULL AUTO_INCREMENT,
  `kelas_ruang` varchar(255) NOT NULL,
  `kelas_matakuliah` varchar(255) NOT NULL,
  `kelas_dosen` int(11) NOT NULL DEFAULT 0,
  `kelas_waktu` time NOT NULL DEFAULT '00:00:00',
  `kelas_hari` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kelas_id`),
  KEY `FK_kelas_login` (`kelas_dosen`),
  CONSTRAINT `FK_kelas_login` FOREIGN KEY (`kelas_dosen`) REFERENCES `eabsen_login` (`login_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_kelas: ~4 rows (approximately)
DELETE FROM `eabsen_kelas`;
/*!40000 ALTER TABLE `eabsen_kelas` DISABLE KEYS */;
INSERT INTO `eabsen_kelas` (`kelas_id`, `kelas_ruang`, `kelas_matakuliah`, `kelas_dosen`, `kelas_waktu`, `kelas_hari`) VALUES
	(5, 'A2', 'Strukdatss - Teknik Informatika', 1, '16:24:00', 5),
	(10, 'Conveyor', 'Agama', 23, '10:15:00', 5),
	(11, 'E-Comerce', 'Sistem Informasi', 31, '13:00:00', 1),
	(12, 'E-Comerce', 'Keyboarding Skill', 34, '10:00:00', 2);
/*!40000 ALTER TABLE `eabsen_kelas` ENABLE KEYS */;

-- Dumping structure for view dbeabsen.eabsen_laporan
DROP VIEW IF EXISTS `eabsen_laporan`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `eabsen_laporan` (
	`pertemuan_id` INT(11) NOT NULL,
	`pertemuan_tanggal` TIMESTAMP NOT NULL,
	`login_id` INT(11) NOT NULL,
	`identity` VARCHAR(255) NULL COLLATE 'latin1_swedish_ci',
	`nama` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`pertemuan_kelas` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for table dbeabsen.eabsen_login
DROP TABLE IF EXISTS `eabsen_login`;
CREATE TABLE IF NOT EXISTS `eabsen_login` (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `identity` varchar(255) DEFAULT NULL,
  `nama` varchar(255) NOT NULL DEFAULT '',
  `prodi` varchar(255) DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `password` char(60) DEFAULT NULL,
  `role` enum('dosen','mahasiswa') NOT NULL DEFAULT 'mahasiswa',
  `otp` char(6) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `nomor_induk` (`identity`) USING BTREE,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_login: ~24 rows (approximately)
DELETE FROM `eabsen_login`;
/*!40000 ALTER TABLE `eabsen_login` DISABLE KEYS */;
INSERT INTO `eabsen_login` (`login_id`, `username`, `identity`, `nama`, `prodi`, `jenis_kelamin`, `avatar`, `password`, `role`, `otp`) VALUES
	(1, 'dosen', '11111', 'Dosen', 'Informatika', NULL, '', '$2y$10$kgkzMT0ukGDNSNrbV0TeYe5U80H2Z14.W.q8qfYA3VE9HNTPMxXIC', 'dosen', NULL),
	(2, 'mahasiswa', '12345', 'Mahasiswa', 'Informatika', NULL, '', '$2y$10$0c0wgG./hzFjZrgXiRa41OLT4yzZfkKJd6AgviEZXoiYvjaJoAbyy', 'mahasiswa', NULL),
	(11, NULL, '18030123 ', 'Roudhotul Hanifa', 'Informatika', NULL, '', '$2y$10$oOTfPFvIDBk.0hpRVUvkKubiCDtH1QUxYQj9wIiLW0MkNEsHCY8xu', 'mahasiswa', NULL),
	(12, NULL, '18041110007', 'Agung', 'Informatika', NULL, '', '$2y$10$svUmSri7AOJJaea2dMoFiOcFWKqjFlyhCmIeeC5usXShJ766zD/O.', 'mahasiswa', NULL),
	(13, NULL, '292838', '12832', 'Informatika', NULL, '', '$2y$10$g6R/egGxpyakBm8rp/KdpeRXwTpGnRY6s7.401LqrttTWF8q5iDxi', 'dosen', NULL),
	(14, NULL, '180411100007', 'Agung', 'Informatika', NULL, '', '$2y$10$sTBM.u0ykkAVudJIEQJzFuK8gTbRpiG6oyhAcOsgCJb1d0cx9Tum.', 'mahasiswa', NULL),
	(16, 'putra', '180411100180', 'Putra', 'Informatika', NULL, '', '$2y$10$tyS5F75suomwH0oxTllekODdrWgnR0u54QikMlc26fC0B6yFLzMc6', 'mahasiswa', NULL),
	(17, NULL, '282928', '828282ss', 'Informatika', NULL, '', '$2y$10$3mB9UTEdtAhn2S47LKDjIu7Dr1oUg17kIHeYrfTKmaeZE2BLnWLTy', 'mahasiswa', NULL),
	(18, NULL, '180411100005', 'linda', 'Informatika', NULL, '', '$2y$10$O8d0UnH9DASPki/xyfH/f.qMmwHCe2S1c51yuG0oB6iHxpSjCqHu.', 'mahasiswa', NULL),
	(19, NULL, '70899679', 'Totok Mulyono', 'Informatika', NULL, '', '$2y$10$GOrHmSRTRBlRcKWdo6lYReST1y7lGdE2gScwXuMc1jNoSoLnQlPQe', 'dosen', NULL),
	(20, NULL, '18030108', 'Endah Puspitarini', 'Informatika', NULL, '', '$2y$10$CjL.vA1LfrbLvFl7euUlCujsWA4QoX5woSvubSi2M/hg7LIjRKbru', 'mahasiswa', NULL),
	(21, NULL, '180411100035', 'abell', 'Informatika', NULL, '', '$2y$10$.wigOLz0IElp1q0Rr/1t5Ox6EaE4FMpSXQFmYsYOh1xY/eNmT0YdW', 'mahasiswa', NULL),
	(22, NULL, '180411100034', 'rahardian', 'Informatika', NULL, '', '$2y$10$kZXM9aFWte/ZSRGQCk.UCeFsE0l0bIS2oXcmRwydm2J2lM1TRejOW', 'mahasiswa', NULL),
	(23, NULL, '1803177', 'Endah rini', 'Informatika', NULL, '', '$2y$10$i5Yz2iOudCuxN5bFQRonEuqv.LyUVEGhm0iENcXAo1RqFIcqky/Nm', 'dosen', NULL),
	(24, NULL, '1803099', 'Syakila', 'Informatika', NULL, '', '$2y$10$uW8obWe.8o2sGmQ9HqB3/e5GDBClQZ/7YCF4pg6Kg4EcPpNaMzxY2', 'mahasiswa', NULL),
	(26, NULL, '18030122', 'Roudhotul Hanifa', 'Informatika', NULL, '', '$2y$10$aWz2LVThj620O6KWS1FLOOxwPTaqwmRZTCuwoCRW2hPHGRc1kc5iu', 'mahasiswa', NULL),
	(27, NULL, '1567', 'Testing', 'Informatika', NULL, '', '$2y$10$f9j/bhy8.ud14oSLYxWoouMz5jO5Nk/up7RLOmgXr1/PwZfJmSJB.', 'dosen', NULL),
	(28, NULL, '189', 'Testing', 'Informatika', NULL, '', '$2y$10$F81iCB98wF2dPlmsOow/kutoLVRTsYY0ybLzykmk.DqiEPDpeJon.', 'mahasiswa', NULL),
	(29, NULL, '123456', 'radit', 'Informatika', NULL, '', '$2y$10$BQovjccT/YudZ7Yj8KW9QuqMH3YaurcnWMZO8Xm6L9.X3kQMNVUUC', 'mahasiswa', NULL),
	(31, NULL, '9875693', 'Totok Mulyono', 'Informatika', NULL, '', '$2y$10$cNkM4h.B826we340BQ0uNe.1cir6t/PT3BouyOULGOyQQtn655bei', 'dosen', NULL),
	(33, NULL, '10963737', 'Lala', 'Informatika', NULL, '', '$2y$10$JCLnc6cVY8u4xpDEJjRDdOSI4SY4EBFBk0FBmXH6qUfp3OIE0IWCq', 'mahasiswa', NULL),
	(34, NULL, '7363538', 'Faridatun Nadziroh', 'Informatika', NULL, '', '$2y$10$YxaKKGdJImbT/wO9h3fxWeceksFYwpnnH2oXSaCyN93DRDGpZfW3q', 'dosen', NULL),
	(35, NULL, '1729377', 'Lala', 'Informatika', NULL, '', '$2y$10$x/FRczBvHGleo7hv4w1RFek3CI64xZHNKmyD7bkloGU7ytOLk/Z5W', 'mahasiswa', NULL),
	(36, NULL, '83984', 'Halo dunia', NULL, NULL, '', '$2y$10$E01xTa04gGmGKUivZTS9JuwBVmXETqmaIvrFZRuX9NYlfdO8887Su', 'mahasiswa', NULL);
/*!40000 ALTER TABLE `eabsen_login` ENABLE KEYS */;

-- Dumping structure for table dbeabsen.eabsen_pertemuan
DROP TABLE IF EXISTS `eabsen_pertemuan`;
CREATE TABLE IF NOT EXISTS `eabsen_pertemuan` (
  `pertemuan_id` int(11) NOT NULL AUTO_INCREMENT,
  `pertemuan_tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `pertemuan_nth` int(11) NOT NULL,
  `pertemuan_kelas` int(11) NOT NULL,
  `pertemuan_token` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`pertemuan_id`),
  UNIQUE KEY `pertemuan_token` (`pertemuan_token`),
  KEY `FK_pertemuan_kelas` (`pertemuan_kelas`),
  CONSTRAINT `FK_pertemuan_kelas` FOREIGN KEY (`pertemuan_kelas`) REFERENCES `eabsen_kelas` (`kelas_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_pertemuan: ~11 rows (approximately)
DELETE FROM `eabsen_pertemuan`;
/*!40000 ALTER TABLE `eabsen_pertemuan` DISABLE KEYS */;
INSERT INTO `eabsen_pertemuan` (`pertemuan_id`, `pertemuan_tanggal`, `pertemuan_nth`, `pertemuan_kelas`, `pertemuan_token`) VALUES
	(16, '2020-03-26 00:00:00', 1, 5, '899014'),
	(17, '2020-04-10 00:00:00', 2, 5, '901922'),
	(18, '2020-06-02 00:00:00', 3, 5, '657056'),
	(19, '2020-06-02 00:00:00', 4, 5, '296579'),
	(20, '2020-06-02 00:00:00', 5, 5, '521440'),
	(28, '2020-06-26 10:20:19', 1, 10, '346018'),
	(29, '2020-07-06 11:23:46', 2, 10, '798882'),
	(30, '2020-07-07 13:02:57', 3, 10, '464295'),
	(31, '2020-07-11 12:15:22', 1, 11, '383394'),
	(32, '2020-07-12 11:34:02', 2, 11, '516652'),
	(33, '2020-07-12 14:49:08', 1, 12, '473112');
/*!40000 ALTER TABLE `eabsen_pertemuan` ENABLE KEYS */;

-- Dumping structure for procedure dbeabsen.eabsen_pertemuan__generate
DROP PROCEDURE IF EXISTS `eabsen_pertemuan__generate`;
DELIMITER //
CREATE PROCEDURE `eabsen_pertemuan__generate`(
	IN `pertemuan_kelas` INT,
	IN `pertemuan_token` VARCHAR(12)
)
BEGIN
SELECT COUNT(*)+1 INTO @nth FROM eabsen_pertemuan WHERE eabsen_pertemuan.pertemuan_kelas = pertemuan_kelas;

INSERT INTO eabsen_pertemuan (pertemuan_nth, pertemuan_kelas, pertemuan_token) VALUES (@nth, pertemuan_kelas, pertemuan_token);
END//
DELIMITER ;

-- Dumping structure for view dbeabsen.eabsen_laporan
DROP VIEW IF EXISTS `eabsen_laporan`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `eabsen_laporan`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `eabsen_laporan` AS SELECT
 eabsen_pertemuan.pertemuan_id,
 eabsen_pertemuan.pertemuan_tanggal,
 eabsen_login.login_id,
 eabsen_login.identity,
 eabsen_login.nama,
 eabsen_pertemuan.pertemuan_kelas
 FROM eabsen_absen
JOIN eabsen_pertemuan ON eabsen_absen.absen_pertemuan = eabsen_pertemuan.pertemuan_id
JOIN eabsen_login ON eabsen_login.login_id = eabsen_absen.absen_mahasiswa
ORDER BY eabsen_pertemuan.pertemuan_tanggal ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
