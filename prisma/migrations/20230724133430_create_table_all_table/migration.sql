-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biodatas` (
    `biodata_id` VARCHAR(255) NOT NULL,
    `study` VARCHAR(255) NULL,
    `job` VARCHAR(255) NULL,
    `description` LONGTEXT NULL,
    `image` TEXT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `biodatas_user_id_key`(`user_id`),
    PRIMARY KEY (`biodata_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `address_id` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NULL,
    `province` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `postal_code` VARCHAR(20) NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `addresses_user_id_key`(`user_id`),
    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `contact_id` VARCHAR(255) NOT NULL,
    `no_hp` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,
    `social_media` VARCHAR(255) NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `contacts_user_id_key`(`user_id`),
    PRIMARY KEY (`contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `token_id` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `tokens_user_id_key`(`user_id`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `followers` (
    `follow_id` VARCHAR(255) NOT NULL,
    `followed_user_id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`follow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolios` (
    `portfolio_id` VARCHAR(255) NOT NULL,
    `image` TEXT NULL,
    `title` TEXT NOT NULL,
    `tag` TEXT NOT NULL,
    `link` TEXT NOT NULL,
    `description` LONGTEXT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `like_id` VARCHAR(255) NOT NULL,
    `portfolio_id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `comment_id` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL,
    `portfolio_id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookmarks` (
    `bookmark_id` VARCHAR(255) NOT NULL,
    `portfolio_id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`bookmark_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `biodatas` ADD CONSTRAINT `biodatas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolios` ADD CONSTRAINT `portfolios_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
