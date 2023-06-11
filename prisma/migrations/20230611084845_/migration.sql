/*
  Warnings:

  - You are about to drop the column `Email` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_Email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `Email`;
