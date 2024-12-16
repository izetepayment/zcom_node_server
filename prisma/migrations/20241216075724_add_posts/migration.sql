/*
  Warnings:

  - You are about to alter the column `name` on the `zcom_admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `title` on the `zcom_banner` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `userName` on the `zcom_cart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `zcom_cart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `category` on the `zcom_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `vendorShop` on the `zcom_delivery_partner` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `zcom_delivery_partner` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `zcom_delivery_partner` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `drivingLicense` on the `zcom_delivery_partner` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `category` on the `zcom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `productName` on the `zcom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.
  - You are about to alter the column `username` on the `zcom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `zcom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `coupon` on the `zcom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `discount` on the `zcom_order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `username` on the `zcom_rating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `title` on the `zcom_rating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `role` on the `zcom_staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `empName` on the `zcom_staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `zcom_staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `joinDate` on the `zcom_staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `productName` on the `zcom_stock` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.
  - You are about to alter the column `coupon` on the `zcom_stock` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.
  - You are about to alter the column `subCategory` on the `zcom_subcategories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `vendorName` on the `zcom_vendor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `zcom_vendor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `shopName` on the `zcom_vendor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.
  - You are about to alter the column `latlong` on the `zcom_vendor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to drop the `zcom_wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `zcom_admin` MODIFY `aId` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'Admin',
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'created',
    MODIFY `auth_key` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_banner` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `banner` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_blog` MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_cart` MODIFY `stockId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `userName` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_categories` MODIFY `category` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_delivery_partner` MODIFY `dPartnerId` VARCHAR(191) NOT NULL,
    MODIFY `vendorShop` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `aadhaarNo` VARCHAR(191) NOT NULL,
    MODIFY `drivingLicense` VARCHAR(191) NOT NULL,
    MODIFY `joinDate` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_order` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `vendorId` VARCHAR(191) NOT NULL,
    MODIFY `items` VARCHAR(191) NOT NULL,
    MODIFY `sku` VARCHAR(191) NOT NULL,
    MODIFY `category` VARCHAR(191) NOT NULL,
    MODIFY `productName` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `addressId` VARCHAR(191) NOT NULL,
    MODIFY `payMode` VARCHAR(191) NOT NULL,
    MODIFY `payId` VARCHAR(191) NOT NULL,
    MODIFY `price` VARCHAR(191) NOT NULL,
    MODIFY `coupon` VARCHAR(191) NOT NULL,
    MODIFY `couponCost` VARCHAR(191) NOT NULL,
    MODIFY `discount` VARCHAR(191) NOT NULL,
    MODIFY `shipPrice` VARCHAR(191) NOT NULL,
    MODIFY `deliveryCharge` VARCHAR(191) NOT NULL,
    MODIFY `packCharge` VARCHAR(191) NOT NULL,
    MODIFY `total` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_rating` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `userImg` VARCHAR(191) NOT NULL,
    MODIFY `stockId` VARCHAR(191) NOT NULL,
    MODIFY `productImg` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `review` VARCHAR(191) NOT NULL,
    MODIFY `rating` DOUBLE NOT NULL DEFAULT 4.5,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_staff` MODIFY `empId` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL,
    MODIFY `empName` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `aadhaarNo` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `joinDate` VARCHAR(191) NOT NULL,
    MODIFY `auth_key` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_stock` MODIFY `vendorId` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `subcategoryId` VARCHAR(191) NOT NULL,
    MODIFY `sku` VARCHAR(191) NOT NULL,
    MODIFY `productName` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `price` VARCHAR(191) NOT NULL,
    MODIFY `strikePrice` VARCHAR(191) NOT NULL,
    MODIFY `qty` VARCHAR(191) NOT NULL,
    MODIFY `discount` VARCHAR(191) NOT NULL,
    MODIFY `coupon` VARCHAR(191) NOT NULL,
    MODIFY `shipPrice` VARCHAR(191) NOT NULL,
    MODIFY `stockUpdate` VARCHAR(191) NOT NULL,
    MODIFY `spec` VARCHAR(191) NOT NULL,
    MODIFY `highlights` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `rating` VARCHAR(191) NOT NULL DEFAULT '4.5',
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_subcategories` MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `subCategory` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_user` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `cc` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `wallet` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `otp` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'created',
    MODIFY `auth_key` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `zcom_vendor` MODIFY `vendorName` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `shopName` VARCHAR(191) NOT NULL,
    MODIFY `shopImg` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `latlong` VARCHAR(191) NOT NULL,
    MODIFY `aadhaarNo` VARCHAR(191) NOT NULL,
    MODIFY `aadhaarImg` VARCHAR(191) NOT NULL,
    MODIFY `panNo` VARCHAR(191) NOT NULL,
    MODIFY `panImg` VARCHAR(191) NOT NULL,
    MODIFY `gstNo` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `zcom_wallet`;
