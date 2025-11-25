CREATE TABLE `apiConfigurations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`provider` varchar(100) NOT NULL,
	`accountId` text,
	`phoneNumberId` text,
	`accessToken` text,
	`apiKey` text,
	`apiSecret` text,
	`webhookUrl` text,
	`isActive` int unsigned NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `apiConfigurations_id` PRIMARY KEY(`id`),
	CONSTRAINT `apiConfigurations_provider_unique` UNIQUE(`provider`)
);
