CREATE TABLE `projects` (
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`description` text,
	`is_template` integer DEFAULT 0 NOT NULL,
	`name` text NOT NULL,
	`projectId` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
