/*
  Warnings:

  - You are about to drop the column `banDetails_banEndDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetails_banStartDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetails_banUploadedBy` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetails_bannedPersonId` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetails_isBanPending` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetails_reason` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banDetails_venueBanId` on the `BanDetail` table. All the data in the column will be lost.
  - Added the required column `banDetail_banEndDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_banStartDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_banUploadedBy` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_bannedPersonId` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_isBanPending` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_reason` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_venueBanId` to the `BanDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetails_banUploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetails_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetails_venueBanId_fkey";

-- AlterTable
ALTER TABLE "BanDetail" DROP COLUMN "banDetails_banEndDate",
DROP COLUMN "banDetails_banStartDate",
DROP COLUMN "banDetails_banUploadedBy",
DROP COLUMN "banDetails_bannedPersonId",
DROP COLUMN "banDetails_isBanPending",
DROP COLUMN "banDetails_reason",
DROP COLUMN "banDetails_venueBanId",
ADD COLUMN     "banDetail_banEndDate" TEXT NOT NULL,
ADD COLUMN     "banDetail_banStartDate" TEXT NOT NULL,
ADD COLUMN     "banDetail_banUploadedBy" INTEGER NOT NULL,
ADD COLUMN     "banDetail_bannedPersonId" INTEGER NOT NULL,
ADD COLUMN     "banDetail_isBanPending" BOOLEAN NOT NULL,
ADD COLUMN     "banDetail_reason" TEXT NOT NULL,
ADD COLUMN     "banDetail_venueBanId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetail_banUploadedBy_fkey" FOREIGN KEY ("banDetail_banUploadedBy") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetail_venueBanId_fkey" FOREIGN KEY ("banDetail_venueBanId") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetail_bannedPersonId_fkey" FOREIGN KEY ("banDetail_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;
