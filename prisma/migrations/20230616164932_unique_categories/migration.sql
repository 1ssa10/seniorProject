/*
  Warnings:

  - A unique constraint covering the columns `[catergory]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_catergory_key` ON `Category`(`catergory`);
