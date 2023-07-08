-- AlterTable
ALTER TABLE `user` MODIFY `username` VARCHAR(191) NULL,
    MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('male', 'female') NULL,
    MODIFY `password` VARCHAR(191) NULL;
