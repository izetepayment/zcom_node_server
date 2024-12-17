/*
  Warnings:

  - Added the required column `password` to the `zcom_vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `zcom_vendor` ADD COLUMN `password` VARCHAR(191) NOT NULL;
