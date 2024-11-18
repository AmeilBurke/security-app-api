/*
  Warnings:

  - The primary key for the `AlertDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alertDetails_bannedPersonId` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetails_businessId` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetails_id` on the `AlertDetail` table. All the data in the column will be lost.
  - The primary key for the `BanDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banDetail_bannedPersonId` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_endDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_id` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_isBanPending` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_reason` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetail_startDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `bannedPerson_image` on the `BannedPerson` table. All the data in the column will be lost.
  - You are about to drop the column `venue_businessId` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `venue_logo` on the `Venue` table. All the data in the column will be lost.
  - The primary key for the `VenueAccess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountVenueAccess` on the `VenueAccess` table. All the data in the column will be lost.
  - The primary key for the `VenueManager` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `venueManagerId` on the `VenueManager` table. All the data in the column will be lost.
  - You are about to drop the `BanLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessAccess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessManager` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[alertDetail_id]` on the table `AlertDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[banDetails_id]` on the table `BanDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannedPerson_id]` on the table `BannedPerson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_id]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[venue_name]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[venueAccess_id]` on the table `VenueAccess` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[venueManager_id]` on the table `VenueManager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alertDetail_imagePath` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertDetail_name` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertDetails_alertReason` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertDetails_alertUploadedBy` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertDetails_startTime` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_banEndDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_banStartDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_banUploadedBy` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_bannedPersonId` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_isBanPending` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_reason` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetails_venueBanId` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannedPerson_imagePath` to the `BannedPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue_imagePath` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_alertDetails_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_alertDetails_businessId_fkey";

-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetail_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "BanLocation" DROP CONSTRAINT "BanLocation_banLocation_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "BanLocation" DROP CONSTRAINT "BanLocation_banLocation_venueId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessAccess" DROP CONSTRAINT "BusinessAccess_businessAccess_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessAccess" DROP CONSTRAINT "BusinessAccess_businessAccess_businessId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessManager" DROP CONSTRAINT "BusinessManager_businessManager_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessManager" DROP CONSTRAINT "BusinessManager_businessManager_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_venue_businessId_fkey";

-- DropIndex
DROP INDEX "AlertDetail_alertDetails_id_key";

-- DropIndex
DROP INDEX "Role_role_name_key";

-- DropIndex
DROP INDEX "VenueAccess_accountVenueAccess_key";

-- DropIndex
DROP INDEX "VenueManager_venueManagerId_key";

-- AlterTable
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_pkey",
DROP COLUMN "alertDetails_bannedPersonId",
DROP COLUMN "alertDetails_businessId",
DROP COLUMN "alertDetails_id",
ADD COLUMN     "alertDetail_bannedPersonId" INTEGER,
ADD COLUMN     "alertDetail_id" SERIAL NOT NULL,
ADD COLUMN     "alertDetail_imagePath" TEXT NOT NULL,
ADD COLUMN     "alertDetail_name" TEXT NOT NULL,
ADD COLUMN     "alertDetails_alertReason" TEXT NOT NULL,
ADD COLUMN     "alertDetails_alertUploadedBy" INTEGER NOT NULL,
ADD COLUMN     "alertDetails_startTime" TEXT NOT NULL,
ADD CONSTRAINT "AlertDetail_pkey" PRIMARY KEY ("alertDetail_id");

-- AlterTable
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_pkey",
DROP COLUMN "banDetail_bannedPersonId",
DROP COLUMN "banDetail_endDate",
DROP COLUMN "banDetail_id",
DROP COLUMN "banDetail_isBanPending",
DROP COLUMN "banDetail_reason",
DROP COLUMN "banDetail_startDate",
ADD COLUMN     "banDetails_banEndDate" TEXT NOT NULL,
ADD COLUMN     "banDetails_banStartDate" TEXT NOT NULL,
ADD COLUMN     "banDetails_banUploadedBy" INTEGER NOT NULL,
ADD COLUMN     "banDetails_bannedPersonId" INTEGER NOT NULL,
ADD COLUMN     "banDetails_id" SERIAL NOT NULL,
ADD COLUMN     "banDetails_isBanPending" BOOLEAN NOT NULL,
ADD COLUMN     "banDetails_reason" TEXT NOT NULL,
ADD COLUMN     "banDetails_venueBanId" INTEGER NOT NULL,
ADD CONSTRAINT "BanDetail_pkey" PRIMARY KEY ("banDetails_id");

-- AlterTable
ALTER TABLE "BannedPerson" DROP COLUMN "bannedPerson_image",
ADD COLUMN     "bannedPerson_imagePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "venue_businessId",
DROP COLUMN "venue_logo",
ADD COLUMN     "venue_imagePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VenueAccess" DROP CONSTRAINT "VenueAccess_pkey",
DROP COLUMN "accountVenueAccess",
ADD COLUMN     "venueAccess_id" SERIAL NOT NULL,
ADD CONSTRAINT "VenueAccess_pkey" PRIMARY KEY ("venueAccess_id");

-- AlterTable
ALTER TABLE "VenueManager" DROP CONSTRAINT "VenueManager_pkey",
DROP COLUMN "venueManagerId",
ADD COLUMN     "venueManager_id" SERIAL NOT NULL,
ADD CONSTRAINT "VenueManager_pkey" PRIMARY KEY ("venueManager_id");

-- DropTable
DROP TABLE "BanLocation";

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "BusinessAccess";

-- DropTable
DROP TABLE "BusinessManager";

-- CreateTable
CREATE TABLE "VenueBan" (
    "venueBan_id" SERIAL NOT NULL,
    "venueBan_bannedPersonId" INTEGER NOT NULL,
    "venueBan_venueId" INTEGER NOT NULL,

    CONSTRAINT "VenueBan_pkey" PRIMARY KEY ("venueBan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VenueBan_venueBan_id_key" ON "VenueBan"("venueBan_id");

-- CreateIndex
CREATE UNIQUE INDEX "AlertDetail_alertDetail_id_key" ON "AlertDetail"("alertDetail_id");

-- CreateIndex
CREATE UNIQUE INDEX "BanDetail_banDetails_id_key" ON "BanDetail"("banDetails_id");

-- CreateIndex
CREATE UNIQUE INDEX "BannedPerson_bannedPerson_id_key" ON "BannedPerson"("bannedPerson_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_id_key" ON "Role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_venue_name_key" ON "Venue"("venue_name");

-- CreateIndex
CREATE UNIQUE INDEX "VenueAccess_venueAccess_id_key" ON "VenueAccess"("venueAccess_id");

-- CreateIndex
CREATE UNIQUE INDEX "VenueManager_venueManager_id_key" ON "VenueManager"("venueManager_id");

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_alertDetail_bannedPersonId_fkey" FOREIGN KEY ("alertDetail_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_alertDetails_alertUploadedBy_fkey" FOREIGN KEY ("alertDetails_alertUploadedBy") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueBan" ADD CONSTRAINT "VenueBan_venueBan_bannedPersonId_fkey" FOREIGN KEY ("venueBan_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueBan" ADD CONSTRAINT "VenueBan_venueBan_venueId_fkey" FOREIGN KEY ("venueBan_venueId") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetails_bannedPersonId_fkey" FOREIGN KEY ("banDetails_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetails_venueBanId_fkey" FOREIGN KEY ("banDetails_venueBanId") REFERENCES "VenueBan"("venueBan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetails_banUploadedBy_fkey" FOREIGN KEY ("banDetails_banUploadedBy") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
