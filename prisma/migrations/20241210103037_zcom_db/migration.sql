-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 16, 2024 at 07:41 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zcom`
--

-- --------------------------------------------------------

--
-- Table structure for table `zcom_admin`
--

DROP TABLE IF EXISTS `zcom_admin`;
CREATE TABLE IF NOT EXISTS `zcom_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aId` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `address` text NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'Admin',
  `status` varchar(150) NOT NULL,
  `auth_key` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_admin`
--

INSERT INTO `zcom_admin` (`id`, `aId`, `name`, `phone`, `email`, `address`, `password`, `role`, `status`, `auth_key`, `createdOn`) VALUES
(10, 'S0010', 'trersf', 'aaffd', 'eqwef@hfs.in', 'ffsf', '12345678', 'Admin', 'created', 'f88fa67cd93d82aadb676a8485680653', '2024-12-02 12:31:25'),
(3, 'S003', 'Ranjitha', '9876543211', 'sathishkumarr@gmail.com', 'Nava India, Coimbatore', '12345678', 'SAdmin', 'Register', '5e4aba774effe088d9cd99c434c0f240', '2024-12-02 12:32:36'),
(4, 'S004', 'Vignesh123', '7410258963', 'sathishkumarr@gmail.com', 'Nava India, Coimbatore123', '12345678', 'Admin', 'Register', '5e4aba774effe088d9cd99c434c0f240', '2024-12-02 12:32:36'),
(5, 'S005', 'Bharath Nagarajan', '6699332200', 'sathishkumarr@gmail.com', 'Nava India, Coimbatore', '12345678', 'Admin', 'Register', '5e4aba774effe088d9cd99c434c0f240', '2024-12-02 12:32:36'),
(6, 'S006', 'Surya Kumar H', '8899665500', 'sathishkumarr@gmail.com', 'Nava India, Coimbatore', '12345678', 'Admin', 'Register', '5e4aba774effe088d9cd99c434c0f240', '2024-12-02 12:32:36'),
(11, 'S0011', 'new sathish', '123456789', 'sathis@gmail.com', 'addwfewewfw', '1234567', 'Admin', 'created', 'b0ebabd0668ae582e07a581f199fcf53', '2024-12-02 12:35:18'),
(7, 'S0008', 'Netframe', '7845203919', 'vhuib@gmail.com', 'Cbe', 'Net@123', 'Admin', 'created', 'eba1beea88e3e212adb66113bca36e1f', '2024-12-02 08:46:00'),
(9, 'S0085', 'Netframe', '7845203911', 'vhuib@gmail.com', 'Cbe', 'Net@123', 'Admin', 'created', '5bca7edd21701040320c342f28148b81', '2024-12-02 08:48:54'),
(13, 'S0013', 'Ranjith123 u', '6381510954', 'test@gmail.com', 'test123 123', '12344321', 'Admin', 'created', 'fea33b96a8db87d5a4e7ab1a08f7568b', '2024-12-02 12:47:03'),
(14, 'S0014', 'surya 10', '1111111111', 'surya@gmail.com', 'covai\n', '123456', 'Admin', 'created', '2519f271c1446de29f4418a65b0f5eeb', '2024-12-06 08:30:10');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_banner`
--

DROP TABLE IF EXISTS `zcom_banner`;
CREATE TABLE IF NOT EXISTS `zcom_banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `banner` text NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_banner`
--

INSERT INTO `zcom_banner` (`id`, `title`, `banner`, `createdOn`) VALUES
(1, 'Laptop', 'header_banner.png', '2024-12-09 13:56:39'),
(2, 'Laptop', 'header_banner.png', '2024-12-09 13:56:39'),
(3, 'Laptop', 'header_banner.png', '2024-12-09 13:56:39'),
(4, 'Laptop', 'header_banner.png', '2024-12-09 13:56:39');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_blog`
--

DROP TABLE IF EXISTS `zcom_blog`;
CREATE TABLE IF NOT EXISTS `zcom_blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_blog`
--

INSERT INTO `zcom_blog` (`id`, `image`, `title`, `content`, `createdOn`) VALUES
(1, 'https://thestockbazaar.com/prisma/ovantica/images/blog-01.jpg', 'Unveiling the Latest iPhone: A Glimpse into Apple\\\'s Technological Marvel:', '[\\n    {\\n        \\\"title\\\": \\\"Introduction\\\",\\n        \\\"description\\\": \\\"In the ever-evolving world of smartphones, Apple has consistently been at the forefront of innovation. With each new release, they manage to captivate the world, leaving tech enthusiasts eagerly anticipating what\\\'s next. The latest iPhone is no exception. In this blog post, we will delve into the unveiling of Apple\\\'s newest technological marvel, exploring its cutting-edge features and advancements that have left users in awesome.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Design Evolution\\\",\\n        \\\"description\\\": \\\"Apple has always been known for its sleek and elegant designs, and the latest iPhone takes it to a whole new level. The device boasts a stunning edge-to-edge display with reduced bezels, creating an immersive visual experience. The use of premium materials ensures a solid build quality, while a range of captivating color options adds a touch of personalization.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Enhanced Display Technology\\\",\\n        \\\"description\\\": \\\"The latest iPhone introduces an enhanced display technology that sets a new standard for visual excellence. With an even higher resolution and improved color accuracy, the screen brings movies, games, and images to life with astonishing clarity and vibrancy. Additionally, the inclusion of ProMotion technology provides a smoother scrolling experience and adaptive refresh rates for optimal performance and battery efficiency.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Breakthrough Camera System\\\",\\n        \\\"description\\\": \\\"Apple\\\'s commitment to revolutionizing smartphone photography continues with the latest iPhone. The camera system has undergone significant advancements, introducing cutting-edge sensor technology and computational photography techniques. Users can now capture stunning photos in low-light conditions, achieve incredible zoom capabilities, and enjoy enhanced image stabilization for both photos and videos.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Powerful Performance\\\",\\n        \\\"description\\\": \\\"Under the hood, the latest iPhone is equipped with Apple\\\'s most powerful chip to date. The combination of advanced architecture and efficient power management ensures lightning-fast performance, whether it\\\'s multitasking, gaming, or running intensive applications. The device also benefits from increased storage options, allowing users to store more of their favorite content without compromise.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Enhanced Privacy and Security\\\",\\n        \\\"description\\\": \\\"Apple continues to prioritize user privacy and security, and the latest iPhone takes it a step further. The device incorporates advanced security features, including biometric authentication and hardware-based encryption. With each new iteration, Apple strengthens its commitment to protecting user data, offering peace of mind in an increasingly connected world.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Seamless Integration with iOS\\\",\\n        \\\"description\\\": \\\"The latest iPhone seamlessly integrates with Apple\\\'s latest iOS, providing users with a cohesive ecosystem of apps and services. Features such as cross-device synchronization, enhanced Siri capabilities, and seamless connectivity with other Apple devices offer a unified user experience that is both convenient and intuitive.\\\"\\n    },\\n    {\\n        \\\"title\\\": \\\"Conclusion\\\",\\n        \\\"description\\\": \\\"Apple\\\'s latest iPhone is undoubtedly a technological marvel that pushes the boundaries of innovation. With its sleek design, enhanced display, advanced camera system, powerful performance, and robust privacy features, it sets a new standard for what a smartphone can achieve. As we eagerly anticipate its release, we can only imagine the countless ways in which this device will transform the way we communicate, create, and experience the world around us. Apple has once again raised the bar, leaving us excited for the future of mobile technology.\\\"\\n    }\\n]', '2024-12-12 11:56:07');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_cart`
--

DROP TABLE IF EXISTS `zcom_cart`;
CREATE TABLE IF NOT EXISTS `zcom_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stockId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_cart`
--

INSERT INTO `zcom_cart` (`id`, `stockId`, `userId`, `userName`, `phone`, `email`, `count`, `createdOn`) VALUES
(1, '[{\\\"id\\\":5675,\\\"qty\\\":\\\"1\\\"}]', '1', 'Abishek', '9876543210', 'abisheik786@gmail.com', 0, '2024-12-11 17:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_categories`
--

DROP TABLE IF EXISTS `zcom_categories`;
CREATE TABLE IF NOT EXISTS `zcom_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(250) NOT NULL,
  `image` text NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_categories`
--

INSERT INTO `zcom_categories` (`id`, `category`, `image`, `createdOn`) VALUES
(1, 'Home & Furniture', 'home&furniture.png', '2024-12-12 13:07:00'),
(2, 'Fashion & Accessories', 'fashion.png', '2024-12-12 13:07:00'),
(3, 'Beauty & Personal Care', 'beauty.png', '2024-12-12 13:07:00'),
(4, 'Pets', 'pets.png', '2024-12-12 13:07:00'),
(5, 'Baby & Kids', 'baby.png', '2024-12-12 13:07:00'),
(6, 'Toys & Video Game', 'toys.png', '2024-12-12 13:07:00'),
(7, 'Health & Wellness', 'health.png', '2024-12-12 13:07:00'),
(8, 'Household & Essentials', 'houshold.png', '2024-12-12 13:07:00'),
(9, 'Patio & Garden', 'garden.png', '2024-12-12 13:07:00'),
(10, 'Sports & Outdoor', 'sports.png', '2024-12-12 13:07:00'),
(11, 'Electronics', 'electronics.png', '2024-12-12 13:07:00'),
(12, 'Grocery & Fruits', 'grocery.png', '2024-12-12 13:07:00'),
(13, 'Music', 'music.png', '2024-12-12 13:07:00'),
(14, 'Kitchen & Home Appliances', 'music.png', '2024-12-12 13:07:00'),
(15, 'Cloths', 'music.png', '2024-12-12 13:07:00');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_delivery_partner`
--

DROP TABLE IF EXISTS `zcom_delivery_partner`;
CREATE TABLE IF NOT EXISTS `zcom_delivery_partner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dPartnerId` varchar(50) NOT NULL,
  `vendorShop` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `aadhaarNo` varchar(50) NOT NULL,
  `drivingLicense` varchar(300) NOT NULL,
  `joinDate` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_delivery_partner`
--

INSERT INTO `zcom_delivery_partner` (`id`, `dPartnerId`, `vendorShop`, `name`, `phone`, `email`, `address`, `aadhaarNo`, `drivingLicense`, `joinDate`, `status`, `createdOn`) VALUES
(1, '1', '1', 'Test', '8975642310', 'test@gmail.com', 'Nava india, coimbatore', '258963147055', 'TN37L68214562', '2024-08-20', 'registered', '2024-12-11 13:43:51');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_order`
--

DROP TABLE IF EXISTS `zcom_order`;
CREATE TABLE IF NOT EXISTS `zcom_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `vendorId` varchar(50) NOT NULL,
  `items` text NOT NULL,
  `sku` varchar(150) NOT NULL,
  `category` varchar(250) NOT NULL,
  `productName` varchar(500) NOT NULL,
  `image` text NOT NULL,
  `username` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(300) NOT NULL,
  `addressId` varchar(50) NOT NULL,
  `payMode` varchar(50) NOT NULL,
  `payId` varchar(100) NOT NULL,
  `price` varchar(50) NOT NULL,
  `coupon` varchar(250) NOT NULL,
  `couponCost` varchar(50) NOT NULL,
  `discount` varchar(250) NOT NULL,
  `shipPrice` varchar(50) NOT NULL,
  `deliveryCharge` varchar(50) NOT NULL,
  `packCharge` varchar(50) NOT NULL,
  `total` varchar(50) NOT NULL,
  `status` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_order`
--

INSERT INTO `zcom_order` (`id`, `userId`, `vendorId`, `items`, `sku`, `category`, `productName`, `image`, `username`, `phone`, `email`, `addressId`, `payMode`, `payId`, `price`, `coupon`, `couponCost`, `discount`, `shipPrice`, `deliveryCharge`, `packCharge`, `total`, `status`, `createdOn`) VALUES
(1, '1', '1', '[]', 'ID455', '1', 'SAMSUNG A52s', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSkMv2zux0aE_FXQ3req_nwuuDQCC-B35iEl--IfTaGhx8C8D68UczHEkK6MByInMUC1qpmckn4hN0-3hAawtuFMBw2le1U', 'Test', '8523697410', 'test@gmail.com', '1', 'ONLINE', 'VYUJJB495846', '22800', '-', '0', '0', '0', '0', '0', '22800', 'created', '2024-12-11 11:46:10');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_rating`
--

DROP TABLE IF EXISTS `zcom_rating`;
CREATE TABLE IF NOT EXISTS `zcom_rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `username` varchar(250) NOT NULL,
  `userImg` text NOT NULL,
  `stockId` varchar(50) NOT NULL,
  `productImg` text NOT NULL,
  `title` varchar(250) NOT NULL,
  `review` text NOT NULL,
  `rating` float NOT NULL DEFAULT '4',
  `useful` int(50) NOT NULL DEFAULT '0',
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_rating`
--

INSERT INTO `zcom_rating` (`id`, `userId`, `username`, `userImg`, `stockId`, `productImg`, `title`, `review`, `rating`, `useful`, `createdOn`) VALUES
(1, '1', 'Test', 'user.png', '1', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSkMv2zux0aE_FXQ3req_nwuuDQCC-B35iEl--IfTaGhx8C8D68UczHEkK6MByInMUC1qpmckn4hN0-3hAawtuFMBw2le1U', 'Good Product', 'This is simply good one', 4.5, 0, '2024-12-11 15:44:05');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_staff`
--

DROP TABLE IF EXISTS `zcom_staff`;
CREATE TABLE IF NOT EXISTS `zcom_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empId` varchar(50) NOT NULL,
  `role` varchar(300) NOT NULL,
  `empName` varchar(200) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `aadhaarNo` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `joinDate` varchar(300) NOT NULL,
  `auth_key` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_staff`
--

INSERT INTO `zcom_staff` (`id`, `empId`, `role`, `empName`, `phone`, `email`, `address`, `aadhaarNo`, `password`, `joinDate`, `auth_key`, `status`, `createdOn`) VALUES
(1, 'EID49615', 'Staff', 'Test', '9876543210', 'test@gmail.com', 'nava india,cbe', '1551126554162020', '12345678', '2024-04-22', 'bdnf46bfb42616dsvdsvFB', 'verified', '2024-12-11 12:40:55');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_stock`
--

DROP TABLE IF EXISTS `zcom_stock`;
CREATE TABLE IF NOT EXISTS `zcom_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendorId` varchar(50) NOT NULL,
  `categoryId` varchar(50) NOT NULL,
  `subcategoryId` varchar(50) NOT NULL,
  `sku` varchar(100) NOT NULL,
  `productName` varchar(500) NOT NULL,
  `image` text NOT NULL,
  `price` varchar(50) NOT NULL,
  `strikePrice` varchar(50) NOT NULL,
  `qty` varchar(50) NOT NULL,
  `discount` varchar(50) NOT NULL,
  `coupon` varchar(500) NOT NULL,
  `shipPrice` varchar(50) NOT NULL,
  `stockUpdate` varchar(50) NOT NULL DEFAULT 'in_stock',
  `spec` text NOT NULL,
  `highlights` text NOT NULL,
  `description` text NOT NULL,
  `rating` varchar(50) NOT NULL DEFAULT '4.5',
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_stock`
--

INSERT INTO `zcom_stock` (`id`, `vendorId`, `categoryId`, `subcategoryId`, `sku`, `productName`, `image`, `price`, `strikePrice`, `qty`, `discount`, `coupon`, `shipPrice`, `stockUpdate`, `spec`, `highlights`, `description`, `rating`, `createdOn`) VALUES
(1, '1', '11', '15', 'BVU41516', 'boAt Rockerz 425 Bluetooth Wireless Over Ear Headphones with Mic Signature Sound, Beast Mode for Gaming, Enx Tech, ASAP Charge, 25H Playtime, Bluetooth V5.2', '[\"headset1.png\",\"headset2.png\",\"headset3.png\"]', '1099', '2999', '7', '63', '-', '50', 'in_stock', 'About this item\nLow Latency- It’s time to up the game and switch to Rockerz 425 wireless headphones that comes equipped with our low latency BEAST Mode, the perfect set up for your gaming sessions.\nNoise Cancelling Calls-With the default ENx tech meant for environmental noise cancellation, you can be heard crystal clear across voice calls. Battery Capacity: 500 mAh\nASAP Charge- Courtesy our ASAP Charge tech, the headphones can fetch a total playtime of up to 10 hours in just 10 min of charging.\n40MM Drivers- The boAt Signature Sound shines through no matter which genre you play, via the 40mm audio drivers.\nPlayback Time- It offers a total playtime of up to 25 hours on a single charge via Type C interface at 60% volume.\nConnectivity- With the features of Dual Pairing and Bluetooth v5.2, you can be rest assured to enjoy a seamless wireless auditory experience.\nVoice Assistant- You can control playback, pick up calls and command your default voice assistant with ease courtesy the easy-access controls and built-in mic.\n1 year warranty from the date of purchase', '', 'Customers say\nCustomers are satisfied with the headphones\' build quality, sound quality, and value for money. They find the headphones comfortable with good bass and voice quality for the price. However, some customers have issues with functionality and disagree on comfort, connectivity, and charging speed.', '4.5', '2024-12-03 11:53:13'),
(2, '1', '2', '7', 'BVU41516', 'Nike Mens Quest 5 Running Shoe', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '3903', '6295', '7', '55', '-', '50', 'in_stock', 'NIKE QUEST 5-WHITE/FIRE RED-LT SMOKE GREY-BLACK-DD0204-104-9UK', '', 'NIKE QUEST 5-WHITE/FIRE RED-LT SMOKE GREY-BLACK-DD0204-104-9UK', '4.5', '2024-12-03 11:53:13'),
(5, '1', '11', '1', 'BVU41516', 'Apple iPhone 14 Pro (Gold, 256 GB)', '[\"iphone (1).png\",\"iphone (2).png\",\"iphone (3).png\"]', '29688', '35600', '7', '5912', '-', '50', 'in_stock', '\n128 GB ROM\n15.49 cm (6.1 inch) Super Retina XDR Display\n12MP + 12MP | 12MP Front Camera\nA15 Bionic Chip, 6 Core Processor Processor', '', '\nStay productive and improve your performance with the Super Retina XDR display that is comfortable for the eyes. Powered with a 12 MP main camera, enjoy taking pictures with friends and family. With a built-in rechargeable lithium-ion battery and equipped with the MagSafe wireless charging, you can charge your phone quickly up to 50 % in just half an hour by using a 20 W adapter. This phone is loaded with a horde of exciting features such as Siri, face ID, barometer, ambient light sensors etc., and is also resistant to dust and water as it is IP68 rated.', '4.5', '2024-12-03 11:53:13'),
(3, '1', '11', '5', 'BVU41516', 'Canon EOS 3000D 18MP Digital SLR Camera (Black) with 18-55mm is II Lens, 16GB Card and Carry Case', '[\"camera (1).png\",\"camera (2).png\",\"camera (3).png\"]', '34490', '35990', '7', '1500', '-', '50', 'in_stock', '\nSelf-Timer, Type C and Mini HDMI, 9 Auto Focus Points, 3x Optical Zoom, WiFi, Full HD, Video Recording at 1080 p on 30fps, APS-C CMOS sensor-which is 25 times larger than a typical Smartphone sensor.\nEffective Pixels: 18 MP\nSensor Type: CMOS\nWiFi Available\nFull HD', '', '\nIf you are a photography enthusiast, then the Canon EOS 3000D DSLR Camera is a must-have gadget. Featuring an 18 MP (APS-C) CMOS sensor and the DIGIC 4+ imaging processor, you can capture amazing photos of your subject at all times, even in low-light conditions. Moreover, the remote Live View function lets you control this camera remotely using your smartphone so you can capture amazing photos even from a distance.', '4.5', '2024-12-03 11:53:13'),
(4, '1', '11', '1', 'BVU41516', 'Apple MacBook AIR Apple M2 - (8 GB/256 GB SSD/Mac OS Monterey) MLXW3HN/A  (13.6 Inch, Space Grey, 1.24 Kg)', '[\"laptop (1).png\",\"laptop (2).png\",\"laptop (3).png\"]', '83900', '99900', '7', '15000', '-', '50', 'in_stock', 'Stylish & Portable Thin and Light Laptop\n13.6 Inch Liquid Retina Display, LED-backlit display with IPS technology, 500 nits brightness, Wide colour (P3), True Tone technology\nLight Laptop without Optical Disk Drive', '', 'You can experience the power of the M2 chip on this redesigned MacBook Air. With a battery back up of up to 18 hours, you can easily get all your work done from anywhere on this easily portable MacBook Air.', '4.5', '2024-12-03 11:53:13'),
(6, '1', '11', '6', 'BVU41516', 'Samsung 301 L, 3 Star, Convertible 5-in-1 Digital Inverter with Display Frost Free Double Door Refrigerator (RT34C4523S9/HL, Silver, Refined Inox, 2024 Model)', '[\"fridge (1).png\",\"fridge (2).png\",\"fridge (3).png\"]', '35990', '54999', '7', '5912', '-', '50', 'in_stock', '\n301 L : Good for families of 3-5 members\nDigital Inverter Compressor\n3 Star : For Energy savings up to 35%\nFrost Free : Auto fridge defrost to stop ice-build up\nConvertible: Offers you more space for all the food you need to store', '', '\nIf you want to keep your groceries, home-cooked meals, or beverages fresh and safe for an extended period, the Samsung Five-in-one Convertible Refrigerator can help you with all your refrigeration requirements. It features Twin Cooling Plus technology, which provides up to five conversion modes to accommodate different refrigeration requirements. Additionally, this technology provides independent cooling systems with different airflows in the refrigerator and freezer to keep perishable food fresh for a long period of time.', '4.5', '2024-12-03 11:53:13'),
(7, '1', '11', '6', 'BVU41516', 'Seventh Heaven Milan 4 Seater Sofa with Ottoman, Chenille Molfino Fabric: 2 year Warranty Fabric 4 Seater Sofa  (Finish Color - Sky Blue, DIY(Do-It-Yourself))', '[\"product (5).png\",\"product (6).png\"]', '15499', '40996', '7', '25000', '-', '50', 'in_stock', '\nUpholestry: Chenille\nFilling Material: Foam\nW x H x D: 185.5 cm x 80 cm x 80 cm (6 ft 1 in x 2 ft 7 in x 2 ft 7 in)\nSymmetrical\nDelivery Condition: DIY - Basic assembly to be done with simple tools by the customer, comes with instructions.', '', 'Seventh Heaven Sofa is ideal for daily use with premium comfort. Our integrated design, manufacturing and quality control process is singularly focused on providing the most innovative series of styles in the industry with highest quality and finish. Our quality craftsmanship ensures great value for money products. In addition to a core team of experienced furniture industry professionals, Seventh Heaven products also rely on the experience of interior designers to ensure that the designs are leading edge and can be incorporated into high end interiors as core feature pieces or as eclectic complimentary additions to any room.', '4.5', '2024-12-03 11:53:13'),
(8, '1', '2', '7', 'SHE41516', 'Exclusive Super Dance India Dance Shoe/Stage Dance shoe 4 Boys/Dancing Sneakers High Tops For Men  (Red , 9)', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '653', '2199', '7', '1650', '-', '50', 'in_stock', 'Exclusive Super Dance India Dance Shoe/Stage Dance shoe 4 Boys/Dancing Sneakers High Tops For Men  (Red , 9)', '', 'Exclusive Super Dance India Dance Shoe/Stage Dance shoe 4 Boys/Dancing Sneakers High Tops For Men  (Red , 9)', '4.5', '2024-12-03 11:53:13'),
(9, '1', '2', '7', 'SHE41516', 'BRUTON Men Sport Shoes | Running Shoes | Casual Walking Shoes | Sneakers', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '499', '2508', '7', '1650', '-', '50', 'in_stock', 'Material typeEthylene Vinyl Acetate\nClosure typeLace-Up\nHeel typeNo Heel\nWater resistance levelNot Water Resistant\nSole materialEthylene Vinyl Acetate\nStyleWalking\nCountry of OriginIndia', '', 'Versatile Design: Suitable for men, boys, gym workouts, jogging, walking, running, and daily use.\nPremium Quality Materials: Crafted with high-quality Synthetic Leather and EVA Sole materials to ensure durability and comfort.\nStylish and Trendy: Features the latest designs to keep you looking trendy and fashionable while you exercise.\nEasy to Clean: Washable design makes maintenance a breeze, ensuring your shoes stay fresh for longer.\nComfortable Fit: Designed for optimal comfort during extended wear, reducing fatigue and discomfor', '4.5', '2024-12-03 11:53:13'),
(10, '1', '2', '7', 'SHE41516', 'AVANT Men\'s Joyrun Running Shoes -Superior Cushioning & Enhanced Grip TPR Outsole Shoes|Superior Traction,Anti Skid, Lightweight,Shock Absorption Tech, Sports Footwear', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '1239', '1999', '7', '500', '-', '50', 'in_stock', 'Material typeEthylene Vinyl Acetate\r\nClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleWalking\r\nCountry of OriginIndia', '', 'WEAVING UPPER: Features a weaving mesh upper that\'s designed for exceptional breathability. It ensures your feet stay cool and comfortable even during the most demanding activities, making them perfect for your runs.\nLIGHTWEIGHT DESIGN: Their design focuses on reducing unnecessary bulk, allowing you to run effortlessly and swiftly.\nCUSHIONED COMFORT: Enjoy plush comfort with a PU Foam insole, responsive support from an EVA midsole.\nSUPERIOR TRACTION: These running shoes for men are made with a TPR outsole, providing superior traction for stability and durability.\nFLEXIBLE DESIGN: These shoes provide a natural and flexible feel that keeps you comfortable and agile all day long.', '4.5', '2024-12-03 11:53:13'),
(11, '1', '2', '7', 'SHE41516', 'ATHCO Mens Akron Memory Foam Comfort', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '699', '2399', '7', '500', '-', '50', 'in_stock', 'Material typeSpandex, Rubber\nClosure typeLace-Up\nHeel typeNo Heel\nWater resistance levelNot Water Resistant\nSole materialEthylene Vinyl Acetate\nStyleAKRON-\"MEMORY FOAM\"-SHOES-RUNNING-WALKING-TRAINING-GYM-DAILY USE-ATHLETIC-SNEAKER-LACEUP-\nCountry of OriginIndiaClosure typeLace-Up\nHeel typeNo Heel\nWater resistance levelNot Water Resistant\nSole materialEthylene Vinyl Acetate\nStyleWalking\nCountry of OriginIndia', '', '\"Memory Foam Comfort\" Shoes|Running|Walking|Training|Gym|Jogging|Sneaker|Athletic|LaceUp|Flexible|Lightweight|Dailyuse|Sports|Casual|ExtraSoft|Fitness', '4.5', '2024-12-03 11:53:13'),
(12, '1', '2', '7', 'SHE41516', 'Amazon Brand - Symactive Mens Archer Running Shoe', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '739', '2199', '7', '1300', '-', '50', 'in_stock', 'Material typeSpandex, Rubber\r\nClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleAKRON-\"MEMORY FOAM\"-SHOES-RUNNING-WALKING-TRAINING-GYM-DAILY USE-ATHLETIC-SNEAKER-LACEUP-\r\nCountry of OriginIndiaClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleWalking\r\nCountry of OriginIndia', '', '\"Memory Foam Comfort\" Shoes|Running|Walking|Training|Gym|Jogging|Sneaker|Athletic|LaceUp|Flexible|Lightweight|Dailyuse|Sports|Casual|ExtraSoft|Fitness', '4.5', '2024-12-03 11:53:13'),
(13, '1', '2', '7', 'SHE41516', 'Puma mens Snatch V2 Sneaker', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '1599', '4299', '7', '1300', '-', '50', 'in_stock', 'Style Name:- Casual Shoe\nModel Name:- Snatch V2\nBrand Color:-Dark Shadow-Vibrant Orange-PUMA White\nWipe with a clean dry cloth', '', '\nPuma Snatch V2\nElevate, intensify the Style drills, out run those goals, here are the perfect PUMA Shoes an all season favorite , perfect for leisure.', '4.5', '2024-12-03 11:53:13'),
(14, '1', '2', '7', 'SHE41516', 'ATHCO Mens Akron Memory Foam Comfort', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '699', '2299', '7', '1300', '-', '50', 'in_stock', 'Material typeSpandex, Rubber\r\nClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleAKRON-\"MEMORY FOAM\"-SHOES-RUNNING-WALKING-TRAINING-GYM-DAILY USE-ATHLETIC-SNEAKER-LACEUP-\r\nCountry of OriginIndiaClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleWalking\r\nCountry of OriginIndia', '', '\"Memory Foam Comfort\" Shoes|Running|Walking|Training|Gym|Jogging|Sneaker|Athletic|LaceUp|Flexible|Lightweight|Dailyuse|Sports|Casual|ExtraSoft|Fitness', '4.5', '2024-12-03 11:53:13'),
(15, '1', '2', '7', 'SHE41516', 'ASIAN Men\'s TARZAN-11 Casual Sneaker Shoes with Synthetic Upper Lightweight Comfortable Mid Top Sneaker Shoes for Men\'s & Boy\'s', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '729', '1299', '7', '1300', '-', '50', 'in_stock', 'ManufacturerASIAN\nPackerAsian Retail Ventures\nItem Weight970 g\nItem Dimensions LxWxH29.5 x 20.2 x 11.1 Centimeters\nNet Quantity1.00 count\nGeneric NameFirst Walker Shoe', '', 'Lightweight & Breathable : Exclusive design and durable materials every step feels light and breezy. Breathable, free-moving fabrics which adjust according to your foot and creates an astoundingly easy-going experience.\nNon Slip & Shockproof : Great engineering strikes a balance in style, made in the potent design and latest fashion trends. Made for long-term wear, with extra emphasis on providing cushion to the feet, removing heel strain.\nComfort Sole & Flexible Walk : The outsoles are made by an air cushion, doubling the effect of shock absorption. Besides, these shoes perform excellent in durability and are also slip resistant. It provides push cushioning comfort for foot pain relief and helps relieve pressure while conforming to your every step\n', '4.5', '2024-12-03 11:53:13'),
(16, '1', '2', '7', 'SHE41516', 'Bata Mens I-and Laceup Casual Shoes', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '1277', '1799', '7', '1300', '-', '50', 'in_stock', 'Material typeSpandex, Rubber\r\nClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleAKRON-\"MEMORY FOAM\"-SHOES-RUNNING-WALKING-TRAINING-GYM-DAILY USE-ATHLETIC-SNEAKER-LACEUP-\r\nCountry of OriginIndiaClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleWalking\r\nCountry of OriginIndia', '', '\"Memory Foam Comfort\" Shoes|Running|Walking|Training|Gym|Jogging|Sneaker|Athletic|LaceUp|Flexible|Lightweight|Dailyuse|Sports|Casual|ExtraSoft|Fitness', '4.5', '2024-12-03 11:53:13'),
(17, '1', '2', '7', 'SHE41516', 'BRUTON EVA Lite Sport Shoes Running Shoes for Men- Blue', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '499', '2399', '7', '1300', '-', '50', 'in_stock', 'Material typeSpandex, Rubber\r\nClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleAKRON-\"MEMORY FOAM\"-SHOES-RUNNING-WALKING-TRAINING-GYM-DAILY USE-ATHLETIC-SNEAKER-LACEUP-\r\nCountry of OriginIndiaClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleWalking\r\nCountry of OriginIndia', '', 'Versatile Design: Suitable for men, boys, gym workouts, jogging, walking, running, and daily use.\nPremium Quality Materials: Crafted with high-quality Synthetic Leather and EVA Sole materials to ensure durability and comfort.\nStylish and Trendy: Features the latest designs to keep you looking trendy and fashionable while you exercise.\nEasy to Clean: Washable design makes maintenance a breeze, ensuring your shoes stay fresh for longer.\nComfortable Fit: Designed for optimal comfort during extended wear, reducing fatigue and discomfor', '4.5', '2024-12-03 11:53:13'),
(18, '1', '2', '7', 'SHE41516', 'ASIAN Sports Shoes for Men | Soft Cushioned Insole || TERMINATOR-08 Running Shoes for Men', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '731', '1299', '7', '1300', '-', '50', 'in_stock', 'Material typeSpandex, Rubber\r\nClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleAKRON-\"MEMORY FOAM\"-SHOES-RUNNING-WALKING-TRAINING-GYM-DAILY USE-ATHLETIC-SNEAKER-LACEUP-\r\nCountry of OriginIndiaClosure typeLace-Up\r\nHeel typeNo Heel\r\nWater resistance levelNot Water Resistant\r\nSole materialEthylene Vinyl Acetate\r\nStyleWalking\r\nCountry of OriginIndia', '', 'MATERIAL: Upper - Mesh | Outsole - EVA\nFEATURES: Closure - Lace-Up | TOE SHAPE- Round Toe\nBenefits: Experience ultimate comfort through the EVA Sole of these shoes. Enjoy dynamic feet and arch support, coupled with slip-resistant features that effectively eliminate the possibility of accidental falls.\nLifestyle: Running Sports Shoes\nThese shoes offer continuous comfort throughout the day, ensuring your feet stay relaxed, all while maintaining a casually stylish appearance.', '4.5', '2024-12-03 11:53:13'),
(19, '1', '2', '7', 'SHE41516', 'Bersache Sports Shoes for Men |Latest Stylish Sports Shoes for Men |Lace-Up Lightweight White Shoes for Running, Walking, Gym,Trekking and Hiking Shoes for Men', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '980', '1850', '7', '1300', '-', '50', 'in_stock', 'Bersache Sports Shoes for Men |Latest Stylish Sports Shoes for Men |Lace-Up Lightweight White Shoes for Running, Walking, Gym,Trekking and Hiking Shoes for Men', '', 'Care Instructions: Wipe with clean and Dry Cloth, Keep the shoe Sole Clean Shoe boxes are an excellent storage option. Keep your Shoes in a dry and ventilated place, away from direct sunlight and away from any heat source\n', '4.5', '2024-12-03 11:53:13'),
(20, '1', '2', '7', 'SHE41516', 'SPARX Men\'s Mesh Running Shoe', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '739', '2199', '7', '1300', '-', '50', 'in_stock', 'Material:MESH\nLifestyle:Casual\nHeel Type:Flats', '', 'Marking a place of premium on tradition and making each piece stylish, beautiful and elegant. We give the possibility to combine the flexibility of tradition and more advanced modern products which last for years.\n\nBreathable Mesh Uppers one-piece ultra-lightweight mesh knit upper has thousands of ventilation holes. It helps your feet dry and comfy. Feel Soft, Comfortable & Breathable with all day wear.The special veins design of the shoe body gives simplicity but not lack of fashion.', '4.5', '2024-12-03 11:53:13'),
(21, '1', '2', '7', 'SHE41516', 'HEALTH FIT Orthopedic & Diabetic Shoes Breathable Soft Sole Ultra-Lightweight Shoes for Men\'s 1252 OLI UK 8 Olive', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '566', '1349', '7', '1300', '-', '50', 'in_stock', 'Healthfit diabetic and orthopedic footwear intended to protect and comfort to fit the human foot. Foot Non-binding relaxed fit and maximum protection against pressure points. The premium orthopedic footwear Healthfit has been dedicated to designing the best therapeutic features, and to offer the world’s most comfortable best walking footwear. Healthfit are also engineered to help reduce ball of the foot pain, heel pain, arch pain, knee pain, low back pain, and to enhance comfort for diabetic and orthopedic footwear.MCP Material Used In Foot Bed Product; Used In Heel Pain, Arch Pain, Clow Toes, Corns Diabetic Foot and Other Foot Problem. HEALTH FIT which provides you high style and comfort in this trendy pair. These comfortable, durable and lightweight will become your favourite Footwears.', '', 'Perfect shoes come in a slip-on style. ... If you have arthritis & Diabetic Orthopedic in your hips, knees, ankles, arch or feet Extra Soft and Comfortable footwear for all Foot Problems The Relax is a part of the HEALTHFIT Footwear Collection\nTARGET USER & OCCASION - Our adjustable Shoes are recommended by doctors and are engineered to offer best footwear solution for Foot Pain, Heel Pain, Arch Pain, Knee Pain, Ball of the Foot Pain, Metatarsal Pain, Bunions, Corns, Hammer Toes, Injured, Maternity, Pregnancy, Back Pain, and to enhance comfort for Sensitive Feet, Diabetic, Arthritic, Neuropathy, Plantar Fasciitis, Pronation,\nPODIATRIST - RECOMMENDED – HEALTHFIT to promote proper foot alignment, built-in orthotics is shown to be effective in helping to treat heel pain and multiple foot problems. LIGHTWEIGHT, SOFT AND LONG-LASTING ––We use the superb material (light rubber outsoles and EVA foam midsoles) to make sure that not only provides long-lasting performance and comfort but also gives a better foot care in daily walking\nEngineered to offer best footwear solution for Foot Pain, Heel Pain, Arch Pain, Knee Pain, Ball of the Foot Pain, Metatarsal Pain, Knee Pain, Back Pain, and to enhance comfort for Sensitive Feet, Diabetic Feet, Arthritic Feet, Neuropathy, Plantar Fasciitis, Pronation, Metatarsalgia, Morton’s Neuroma, Hammer Toes.\nThey Are Extremely Light Weight and Durable Shoes and Are Widely Used by Men’s & Especially Old Aged, Men with Foot, Knee and Back Pain, Arthritis, Plantar Fasciitis, Etc. These Extra Soft Doctor Chappal are mostly used by Men’s', '4.5', '2024-12-03 11:53:13'),
(22, '1', '2', '7', 'SHE41516', 'AVANT Men\'s Panther Running Shoes - Superior Cushioning, Enhanced Grip TPR Outsole, Superior Traction, Anti Skid, Lightweight, Shock Absorption Tech, Sports Footwear', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '1199', '3010', '7', '1300', '-', '50', 'in_stock', 'KNITTED UPPER: Features a knitted upper that\'s designed for exceptional breathability. It ensures your feet stay cool and comfortable even during the most demanding activities, making them perfect for your runs.\nLIGHTWEIGHT DESIGN: Their design focuses on reducing unnecessary bulk, allowing you to run effortlessly and swiftly.\nCUSHIONED COMFORT: Enjoy plush comfort with a PU Moulded insole, and responsive support from an EVA midsole.\nSUPERIOR TRACTION: These running shoes for men are made with a TPR outsole, providing superior traction for stability and durability.\nFLEXIBLE DESIGN: These shoes provide a natural and flexible feel that keeps you comfortable and agile all day long.', '', 'Go for the Avant Men\'s Panther Sports Shoes. Whether you\'re hitting the track, court, or gym, these shoes bring the best of both worlds – style and performance, perfect for all your sporty activities. The mesh keeps things cool, even if you\'re going the extra mile. No need to sacrifice style for fitness with these bad boys on your feet. AVANT Brought to you by CULT', '4.5', '2024-12-03 11:53:13'),
(23, '1', '2', '7', 'SHE41516', 'HEALTH FIT Orthopedic & Diabetic Shoes Breathable Soft Sole Ultra-Lightweight Shoes for Men\'s 1252 OLI UK 8 Olive', '[\"shoe (1).png\",\"shoe (2).png\",\"shoe (3).png\"]', '1199', '3010', '7', '1300', '-', '50', 'in_stock', 'KNITTED UPPER: Features a knitted upper that\'s designed for exceptional breathability. It ensures your feet stay cool and comfortable even during the most demanding activities, making them perfect for your runs.\r\nLIGHTWEIGHT DESIGN: Their design focuses on reducing unnecessary bulk, allowing you to run effortlessly and swiftly.\r\nCUSHIONED COMFORT: Enjoy plush comfort with a PU Moulded insole, and responsive support from an EVA midsole.\r\nSUPERIOR TRACTION: These running shoes for men are made with a TPR outsole, providing superior traction for stability and durability.\r\nFLEXIBLE DESIGN: These shoes provide a natural and flexible feel that keeps you comfortable and agile all day long.', '', 'Go for the Avant Men\'s Panther Sports Shoes. Whether you\'re hitting the track, court, or gym, these shoes bring the best of both worlds – style and performance, perfect for all your sporty activities. The mesh keeps things cool, even if you\'re going the extra mile. No need to sacrifice style for fitness with these bad boys on your feet. AVANT Brought to you by CULT', '4.5', '2024-12-03 11:53:13');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_subcategories`
--

DROP TABLE IF EXISTS `zcom_subcategories`;
CREATE TABLE IF NOT EXISTS `zcom_subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` varchar(50) NOT NULL,
  `subCategory` varchar(250) NOT NULL,
  `image` text NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_subcategories`
--

INSERT INTO `zcom_subcategories` (`id`, `categoryId`, `subCategory`, `image`, `createdOn`) VALUES
(1, '11', 'Mobile', 'subcat_mobile.png', '2024-12-06 12:37:21'),
(2, '11', 'Laptop', 'subcat_laptop.png', '2024-12-06 12:37:21'),
(3, '11', 'TV', 'product (22).png', '2024-12-06 12:37:21'),
(4, '11', 'Tablet', 'iphone.png', '2024-12-06 12:37:21'),
(5, '11', 'Camera', 'camera (1).png', '2024-12-06 12:37:21'),
(6, '11', 'Refrigerator', 'subcat_refg.png', '2024-12-06 12:37:21'),
(7, '2', 'Footwear', 'subcat_footwear.png', '2024-12-06 12:37:21'),
(8, '2', 'Sofa', 'subcat_sofa.png', '2024-12-06 12:37:21'),
(9, '14', 'Pan', 'product (7).png', '2024-12-06 12:37:21'),
(10, '14', 'Spoon', 'product (1).png', '2024-12-06 12:37:21'),
(11, '14', 'Grinder', 'product (4).png', '2024-12-06 12:37:21'),
(12, '15', 'Mens Cloths', 'subcat_menscloth.png', '2024-12-06 12:37:21'),
(13, '15', 'Kids Cloths', 'subcat_kidcloth.png', '2024-12-06 12:37:21'),
(14, '6', 'Toys', 'subcat_toys.png', '2024-12-06 12:37:21'),
(15, '11', 'Headset', 'headset1.png', '2024-12-06 12:37:21'),
(16, '2', 'Bags', 'headset1.png', '2024-12-06 12:37:21'),
(17, '7', 'Sports', 'headset1.png', '2024-12-06 12:37:21'),
(18, '12', 'Grocery', 'headset1.png', '2024-12-06 12:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_user`
--

DROP TABLE IF EXISTS `zcom_user`;
CREATE TABLE IF NOT EXISTS `zcom_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `cc` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(50) NOT NULL,
  `wallet` float NOT NULL DEFAULT '0',
  `otp` varchar(50) NOT NULL,
  `status` varchar(150) NOT NULL DEFAULT 'registered',
  `auth_key` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_user`
--

INSERT INTO `zcom_user` (`id`, `name`, `cc`, `phone`, `email`, `password`, `wallet`, `otp`, `status`, `auth_key`, `createdOn`) VALUES
(1, 'Gopal Ns', '+91', '9787665850', 'test@gmail.com', '12344321', 110, '5529', 'verified', '5e4aba774effe088d9cd99c434c0f240', '2023-09-12 09:34:59'),
(2, 'stee', '+91', '9566766834', 'KingSteephan92@gmail.com', '12345678', 0, '6759', 'verified', '1e721ee9010f9caca97063383acc0c25', '2024-03-08 06:43:08'),
(3, 'ikart', '+91', '9843530967', 'ikart625011@gmail.com', 'meeranfaiyaz', 0, '1078', 'verified', '57a8984272af4dec7e566558d2862657', '2024-03-08 13:58:40'),
(4, 'afrun', '+91', '7845105586', 'bsameeranfaiyaz786@gmail.com', 'meeranfaiyaz', 0, '9282', 'verified', 'b5fd6389025229d6fbbe13e841a6011f', '2024-03-08 14:04:04'),
(5, 'bigyan maity ', '+91', '9195104843', 'bigyanmaity85@gmail.com', '12345678', 0, '3392', 'registered', '646fcaf782205189205ea3e91ce2520b', '2024-03-13 13:47:17'),
(6, 'rizwana', '+91', '9361651529', 'afrunnishabathusha@gmail.com ', '29af2001', 0, '8863', 'registered', 'b1f33ae4e04c925301d70ff9a1cd8d9c', '2024-03-14 04:20:30'),
(7, 'rizwana ', '+91', '9344101529', 'afrunnishabathusha@gmail.com ', '29af2001', 0, '5917', 'registered', '849c9dd910e3c26e99d61c100f4e7183', '2024-03-14 04:22:21'),
(8, 'zaayid ', '+91', '9500551075', 'afrunnishabathusha@gmail.com ', '29af2001', 0, '5421', 'registered', 'f1a715fd766b25a9b5110e12bdd7aa9f', '2024-03-14 05:11:39'),
(9, 'faiyaz', '+91', '8754021216', 'afrunnishabathusha@gmail.com ', '29af2001', 0, '4495', 'registered', '9347a16f2ead7dca4c4bd3aa4bc67412', '2024-03-14 14:52:58'),
(10, 'Aarif', '+91', '9790570585', 'aarifmohammed@yahoo.in', '29af2001', 0, '7442', 'registered', 'a4ff23a0ce75e5df0b4a37361f7138d0', '2024-03-14 14:56:45'),
(11, 'shivakumar Aggimat ', '+91', '9632270966', 'shivak52750@gmail.com', '90710427', 0, '6836', 'registered', '4283c561966756e3c4af7c9781a3d4d8', '2024-03-15 13:04:32'),
(12, 'subasri', '+91', '9944793494', '2022mca02@fcmdu.edu.in', 'suba@2001', 0, '9863', 'verified', 'd6760e85a43b49cd6bcb24964eeb328b', '2024-03-16 13:49:55'),
(13, 'Fakrudin Ansari ', '+91', '8235923184', 'ismayalansari00786@gmail.com', '99319571', 0, '1648', 'registered', 'ff1f3694e5ecac38d28e0828bc0d50ae', '2024-03-18 23:49:44');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_vendor`
--

DROP TABLE IF EXISTS `zcom_vendor`;
CREATE TABLE IF NOT EXISTS `zcom_vendor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendorName` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `shopName` varchar(500) NOT NULL,
  `shopImg` text NOT NULL,
  `address` text NOT NULL,
  `latlong` varchar(200) NOT NULL,
  `aadhaarNo` varchar(50) NOT NULL,
  `aadhaarImg` text NOT NULL,
  `panNo` varchar(50) NOT NULL,
  `panImg` text NOT NULL,
  `gstNo` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zcom_vendor`
--

INSERT INTO `zcom_vendor` (`id`, `vendorName`, `phone`, `email`, `shopName`, `shopImg`, `address`, `latlong`, `aadhaarNo`, `aadhaarImg`, `panNo`, `panImg`, `gstNo`, `status`, `createdOn`) VALUES
(1, 'Test', '9876543213', 'teat@gmail.com', 'Nva Company', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSkMv2zux0aE_FXQ3req_nwuuDQCC-B35iEl--IfTaGhx8C8D68UczHEkK6MByInMUC1qpmckn4hN0-3hAawtuFMBw2le1U', 'nava india, cbe', '11.15515,11.235525', '220508150515510150', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSkMv2zux0aE_FXQ3req_nwuuDQCC-B35iEl--IfTaGhx8C8D68UczHEkK6MByInMUC1qpmckn4hN0-3hAawtuFMBw2le1U', 'PAN59262v', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSkMv2zux0aE_FXQ3req_nwuuDQCC-B35iEl--IfTaGhx8C8D68UczHEkK6MByInMUC1qpmckn4hN0-3hAawtuFMBw2le1U', 'BJH8485520', 'verified', '2024-12-11 12:24:26');

-- --------------------------------------------------------

--
-- Table structure for table `zcom_wallet`
--

DROP TABLE IF EXISTS `zcom_wallet`;
CREATE TABLE IF NOT EXISTS `zcom_wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `operation` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `payMode` varchar(50) NOT NULL,
  `reason` text,
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
