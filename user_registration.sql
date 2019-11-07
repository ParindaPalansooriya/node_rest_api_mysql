-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2019 at 10:04 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `user_registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `image_info`
--

CREATE TABLE IF NOT EXISTS `image_info` (
  `imageid` int(100) NOT NULL AUTO_INCREMENT,
  `id` int(100) NOT NULL,
  `file_name` varchar(250) NOT NULL,
  PRIMARY KEY (`imageid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `image_info`
--

INSERT INTO `image_info` (`imageid`, `id`, `file_name`) VALUES
(1, 0, '+received.file.filename'),
(2, 0, '+received.file.filename.rar'),
(4, 1, '2019103212514725The.Blkt.S05E07.rar'),
(5, 1, '201910322019358The.Blkt.S05E07.rar'),
(6, 1, '201910322019358jersey-examples-2.9.1-all.zip'),
(7, 1, '2019103221224266jaxrs-ri-2.5.zip'),
(8, 1, '2019103221224266KsiriTools_source_from_JADX.zip');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `name`, `email`, `password`) VALUES
(1, 'yassitha', 'parindapalansooriya@gmail.com', '1234'),
(3, 'yassitha', 'yassitha@gmail.com', 'yassitha'),
(5, 'reg_name.value', 'reg_email.value', 'reg_con_pass.value'),
(6, 'sasa', 'sasas', '123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
