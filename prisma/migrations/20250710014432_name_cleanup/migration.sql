/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `account_name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `account_password` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `account_roleId` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `AlertDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alertDetail_alertReason` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetail_alertUploadedBy` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetail_bannedPersonId` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetail_id` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetail_imagePath` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetail_name` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetail_startTime` on the `AlertDetail` table. All the data in the column will be lost.
  - The primary key for the `BanDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banDetail_banEndDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_banStartDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_banUploadedBy` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_bannedPersonId` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_id` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_isBanPending` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_reason` on the `BanDetail` table. All the data in the column will be lost.
  - The primary key for the `BanDetailVenue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banDetailVenue_id` on the `BanDetailVenue` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_id` on the `BanDetailVenue` table. All the data in the column will be lost.
  - You are about to drop the column `venue_id` on the `BanDetailVenue` table. All the data in the column will be lost.
  - The primary key for the `BannedPerson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bannedPerson_id` on the `BannedPerson` table. All the data in the column will be lost.
  - You are about to drop the column `bannedPerson_imagePath` on the `BannedPerson` table. All the data in the column will be lost.
  - You are about to drop the column `bannedPerson_name` on the `BannedPerson` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `Venue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `venue_id` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `venue_imagePath` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `venue_name` on the `Venue` table. All the data in the column will be lost.
  - The primary key for the `VenueAccess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `venueAccess_accountId` on the `VenueAccess` table. All the data in the column will be lost.
  - You are about to drop the column `venueAccess_id` on the `VenueAccess` table. All the data in the column will be lost.
  - You are about to drop the column `venueAccess_venueId` on the `VenueAccess` table. All the data in the column will be lost.
  - The primary key for the `VenueManager` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `venueManager_accountId` on the `VenueManager` table. All the data in the column will be lost.
  - You are about to drop the column `venueManager_id` on the `VenueManager` table. All the data in the column will be lost.
  - You are about to drop the column `venueManager_venueId` on the `VenueManager` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedById` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPending` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedById` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banId` to the `BanDetailVenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `BanDetailVenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `BannedPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BannedPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `VenueAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `VenueAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `VenueManager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `VenueManager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_account_roleId_fkey";

-- DropForeignKey
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_alertDetail_alertUploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_alertDetail_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetail_banUploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetail_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "BanDetailVenue" DROP CONSTRAINT "BanDetailVenue_banDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "BanDetailVenue" DROP CONSTRAINT "BanDetailVenue_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "VenueAccess" DROP CONSTRAINT "VenueAccess_venueAccess_accountId_fkey";

-- DropForeignKey
ALTER TABLE "VenueAccess" DROP CONSTRAINT "VenueAccess_venueAccess_venueId_fkey";

-- DropForeignKey
ALTER TABLE "VenueManager" DROP CONSTRAINT "VenueManager_venueManager_accountId_fkey";

-- DropForeignKey
ALTER TABLE "VenueManager" DROP CONSTRAINT "VenueManager_venueManager_venueId_fkey";

-- DropIndex
DROP INDEX "Account_account_email_key";

-- DropIndex
DROP INDEX "Account_account_id_key";

-- DropIndex
DROP INDEX "AlertDetail_alertDetail_id_key";

-- DropIndex
DROP INDEX "BanDetail_banDetail_id_key";

-- DropIndex
DROP INDEX "BanDetailVenue_banDetailVenue_id_key";

-- DropIndex
DROP INDEX "BannedPerson_bannedPerson_id_key";

-- DropIndex
DROP INDEX "Role_role_id_key";

-- DropIndex
DROP INDEX "Venue_venue_id_key";

-- DropIndex
DROP INDEX "Venue_venue_name_key";

-- DropIndex
DROP INDEX "VenueAccess_venueAccess_id_key";

-- DropIndex
DROP INDEX "VenueManager_venueManager_id_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "account_email",
DROP COLUMN "account_id",
DROP COLUMN "account_name",
DROP COLUMN "account_password",
DROP COLUMN "account_roleId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_pkey",
DROP COLUMN "alertDetail_alertReason",
DROP COLUMN "alertDetail_alertUploadedBy",
DROP COLUMN "alertDetail_bannedPersonId",
DROP COLUMN "alertDetail_id",
DROP COLUMN "alertDetail_imagePath",
DROP COLUMN "alertDetail_name",
DROP COLUMN "alertDetail_startTime",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "personId" INTEGER,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedById" INTEGER NOT NULL,
ADD CONSTRAINT "AlertDetail_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_pkey",
DROP COLUMN "banDetail_banEndDate",
DROP COLUMN "banDetail_banStartDate",
DROP COLUMN "banDetail_banUploadedBy",
DROP COLUMN "banDetail_bannedPersonId",
DROP COLUMN "banDetail_id",
DROP COLUMN "banDetail_isBanPending",
DROP COLUMN "banDetail_reason",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "isPending" BOOLEAN NOT NULL,
ADD COLUMN     "personId" INTEGER NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedById" INTEGER NOT NULL,
ADD CONSTRAINT "BanDetail_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BanDetailVenue" DROP CONSTRAINT "BanDetailVenue_pkey",
DROP COLUMN "banDetailVenue_id",
DROP COLUMN "banDetail_id",
DROP COLUMN "venue_id",
ADD COLUMN     "banId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "venueId" INTEGER NOT NULL,
ADD CONSTRAINT "BanDetailVenue_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BannedPerson" DROP CONSTRAINT "BannedPerson_pkey",
DROP COLUMN "bannedPerson_id",
DROP COLUMN "bannedPerson_imagePath",
DROP COLUMN "bannedPerson_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "BannedPerson_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "role_id",
DROP COLUMN "role_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_pkey",
DROP COLUMN "venue_id",
DROP COLUMN "venue_imagePath",
DROP COLUMN "venue_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Venue_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VenueAccess" DROP CONSTRAINT "VenueAccess_pkey",
DROP COLUMN "venueAccess_accountId",
DROP COLUMN "venueAccess_id",
DROP COLUMN "venueAccess_venueId",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "venueId" INTEGER NOT NULL,
ADD CONSTRAINT "VenueAccess_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VenueManager" DROP CONSTRAINT "VenueManager_pkey",
DROP COLUMN "venueManager_accountId",
DROP COLUMN "venueManager_id",
DROP COLUMN "venueManager_venueId",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "venueId" INTEGER NOT NULL,
ADD CONSTRAINT "VenueManager_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "Venue"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueAccess" ADD CONSTRAINT "VenueAccess_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueAccess" ADD CONSTRAINT "VenueAccess_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueManager" ADD CONSTRAINT "VenueManager_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueManager" ADD CONSTRAINT "VenueManager_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_personId_fkey" FOREIGN KEY ("personId") REFERENCES "BannedPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_personId_fkey" FOREIGN KEY ("personId") REFERENCES "BannedPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetailVenue" ADD CONSTRAINT "BanDetailVenue_banId_fkey" FOREIGN KEY ("banId") REFERENCES "BanDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetailVenue" ADD CONSTRAINT "BanDetailVenue_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
