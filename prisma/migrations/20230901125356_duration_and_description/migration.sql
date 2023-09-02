/*
  Warnings:

  - You are about to drop the column `avgRatingid` on the `film` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `film` DROP COLUMN `avgRatingid`,
    ADD COLUMN `avgRatingId` VARCHAR(191) NULL,
    MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `duration` VARCHAR(191) NOT NULL;
