/*
  Warnings:

  - You are about to drop the column `AVG_RateId` on the `film` table. All the data in the column will be lost.
  - You are about to drop the `avg_rate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `film` DROP FOREIGN KEY `Film_AVG_RateId_fkey`;

-- AlterTable
ALTER TABLE `film` DROP COLUMN `AVG_RateId`,
    ADD COLUMN `avgRatingid` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `avg_rate`;
