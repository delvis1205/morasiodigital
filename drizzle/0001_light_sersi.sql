CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`imageUrl` text,
	`isActive` int unsigned NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderNumber` varchar(50) NOT NULL,
	`userId` int,
	`customerName` varchar(200) NOT NULL,
	`customerEmail` varchar(320),
	`customerPhone` varchar(50) NOT NULL,
	`playerId` varchar(100) NOT NULL,
	`playerNickname` varchar(100),
	`gameName` varchar(100) NOT NULL,
	`productId` int NOT NULL,
	`productName` varchar(200) NOT NULL,
	`productPrice` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`totalAmount` int NOT NULL,
	`paymentMethod` enum('express','paypay','unitel','iban_bai','iban_bfa','presencial') NOT NULL,
	`status` enum('pending','paid','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
	`proofUrl` text,
	`proofFileKey` text,
	`notes` text,
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`slug` varchar(200) NOT NULL,
	`description` text,
	`shortDescription` varchar(500),
	`imageUrl` text,
	`price` int NOT NULL,
	`originalPrice` int,
	`bonus` varchar(200),
	`isActive` int unsigned NOT NULL DEFAULT 1,
	`isFeatured` int unsigned NOT NULL DEFAULT 0,
	`salesCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`)
);
