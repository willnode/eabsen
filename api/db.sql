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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_absen: ~2 rows (approximately)
DELETE FROM `eabsen_absen`;
/*!40000 ALTER TABLE `eabsen_absen` DISABLE KEYS */;
INSERT INTO `eabsen_absen` (`absen_id`, `absen_waktu`, `absen_mahasiswa`, `absen_pertemuan`) VALUES
	(6, '2020-04-10 21:29:01', 2, 17),
	(7, '2020-06-02 07:01:10', 2, 20);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_kelas: ~1 rows (approximately)
DELETE FROM `eabsen_kelas`;
/*!40000 ALTER TABLE `eabsen_kelas` DISABLE KEYS */;
INSERT INTO `eabsen_kelas` (`kelas_id`, `kelas_ruang`, `kelas_matakuliah`, `kelas_dosen`, `kelas_waktu`, `kelas_hari`) VALUES
	(5, 'A2', 'Strukdatss', 1, '16:24:00', 5);
/*!40000 ALTER TABLE `eabsen_kelas` ENABLE KEYS */;

-- Dumping structure for view dbeabsen.eabsen_laporan
DROP VIEW IF EXISTS `eabsen_laporan`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `eabsen_laporan` (
	`pertemuan_id` INT(11) NOT NULL,
	`pertemuan_tanggal` TIMESTAMP NOT NULL,
	`login_id` INT(11) NOT NULL,
	`nim` VARCHAR(255) NULL COLLATE 'latin1_swedish_ci',
	`nama` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`pertemuan_kelas` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for table dbeabsen.eabsen_login
DROP TABLE IF EXISTS `eabsen_login`;
CREATE TABLE IF NOT EXISTS `eabsen_login` (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `nip` varchar(255) DEFAULT NULL,
  `nim` varchar(255) DEFAULT NULL,
  `nama` varchar(255) NOT NULL DEFAULT '',
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `password` char(60) DEFAULT NULL,
  `role` enum('dosen','mahasiswa') NOT NULL DEFAULT 'mahasiswa',
  `otp` char(6) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `nomor_induk` (`nip`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_login: ~4 rows (approximately)
DELETE FROM `eabsen_login`;
/*!40000 ALTER TABLE `eabsen_login` DISABLE KEYS */;
INSERT INTO `eabsen_login` (`login_id`, `username`, `nip`, `nim`, `nama`, `jenis_kelamin`, `avatar`, `password`, `role`, `otp`) VALUES
	(1, 'dosen', '11111', NULL, 'Dosen', NULL, '', '$2y$10$kgkzMT0ukGDNSNrbV0TeYe5U80H2Z14.W.q8qfYA3VE9HNTPMxXIC', 'dosen', NULL),
	(2, 'mahasiswa', NULL, '12345', 'Mahasiswa', NULL, '', '$2y$10$0c0wgG./hzFjZrgXiRa41OLT4yzZfkKJd6AgviEZXoiYvjaJoAbyy', 'mahasiswa', NULL),
	(3, NULL, NULL, '09876', 'Haaaaaw', NULL, '', '$2y$10$XDn1MGnC6.BE4hR9uHdDyuOwZaLZ/Lxs6VrxBuiGrvXrzJtHI22ua', 'mahasiswa', NULL),
	(4, NULL, '1234', NULL, 'WWWW', NULL, '', '$2y$10$mrXzwUm/OJJA7BRCIyRs3e62b7mx5XYNujaO1JsuSFZW77E0CrTt.', 'dosen', NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table dbeabsen.eabsen_pertemuan: ~5 rows (approximately)
DELETE FROM `eabsen_pertemuan`;
/*!40000 ALTER TABLE `eabsen_pertemuan` DISABLE KEYS */;
INSERT INTO `eabsen_pertemuan` (`pertemuan_id`, `pertemuan_tanggal`, `pertemuan_nth`, `pertemuan_kelas`, `pertemuan_token`) VALUES
	(16, '2020-03-26 00:00:00', 1, 5, '899014'),
	(17, '2020-04-10 00:00:00', 2, 5, '901922'),
	(18, '2020-06-02 00:00:00', 3, 5, '657056'),
	(19, '2020-06-02 00:00:00', 4, 5, '296579'),
	(20, '2020-06-02 00:00:00', 5, 5, '521440');
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
 eabsen_login.nim,
 eabsen_login.nama,
 eabsen_pertemuan.pertemuan_kelas
 FROM eabsen_absen
JOIN eabsen_pertemuan ON eabsen_absen.absen_pertemuan = eabsen_pertemuan.pertemuan_id
JOIN eabsen_login ON eabsen_login.login_id = eabsen_absen.absen_mahasiswa
ORDER BY eabsen_pertemuan.pertemuan_tanggal ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
