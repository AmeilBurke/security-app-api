/*
  Warnings:

  - You are about to drop the column `role_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `bannedPerson_id` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the `AccountBusinessAccess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountVenueAccess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BanList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_role_id_fkey";

-- DropForeignKey
ALTER TABLE "AccountBusinessAccess" DROP CONSTRAINT "AccountBusinessAccess_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountBusinessAccess" DROP CONSTRAINT "AccountBusinessAccess_business_id_fkey";

-- DropForeignKey
ALTER TABLE "AccountVenueAccess" DROP CONSTRAINT "AccountVenueAccess_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountVenueAccess" DROP CONSTRAINT "AccountVenueAccess_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_bannedPerson_id_fkey";

-- DropForeignKey
ALTER TABLE "BanList" DROP CONSTRAINT "BanList_banList_id_fkey";

-- DropForeignKey
ALTER TABLE "BanList" DROP CONSTRAINT "BanList_venue_id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role_id",
ADD COLUMN     "account_roleId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "BanDetail" DROP COLUMN "bannedPerson_id",
ADD COLUMN     "banDetail_bannedPersonId" INTEGER;

-- DropTable
DROP TABLE "AccountBusinessAccess";

-- DropTable
DROP TABLE "AccountVenueAccess";

-- DropTable
DROP TABLE "BanList";

-- CreateTable
CREATE TABLE "BanLocation" (
    "banLocation_id" SERIAL NOT NULL,
    "banLocation_bannedPersonId" INTEGER NOT NULL,
    "banLocation_venueId" INTEGER NOT NULL,

    CONSTRAINT "BanLocation_pkey" PRIMARY KEY ("banLocation_id")
);

-- CreateTable
CREATE TABLE "BusinessAccess" (
    "businessAccess_id" SERIAL NOT NULL,
    "businessAccess_accountId" INTEGER NOT NULL,
    "businessAccess_businessId" INTEGER NOT NULL,

    CONSTRAINT "BusinessAccess_pkey" PRIMARY KEY ("businessAccess_id")
);

-- CreateTable
CREATE TABLE "VenueAccess" (
    "accountVenueAccess" SERIAL NOT NULL,
    "venueAccess_accountId" INTEGER NOT NULL,
    "venueAccess_venueId" INTEGER NOT NULL,

    CONSTRAINT "VenueAccess_pkey" PRIMARY KEY ("accountVenueAccess")
);

-- CreateTable
CREATE TABLE "VenueManager" (
    "venueManagerId" SERIAL NOT NULL,
    "venueManager_accountId" INTEGER NOT NULL,
    "venueManager_venueId" INTEGER NOT NULL,

    CONSTRAINT "VenueManager_pkey" PRIMARY KEY ("venueManagerId")
);

-- CreateTable
CREATE TABLE "BusinessManager" (
    "businessManagerId" SERIAL NOT NULL,
    "businessManager_accountId" INTEGER NOT NULL,
    "businessManager_businessId" INTEGER NOT NULL,

    CONSTRAINT "BusinessManager_pkey" PRIMARY KEY ("businessManagerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BanLocation_banLocation_id_key" ON "BanLocation"("banLocation_id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccess_businessAccess_id_key" ON "BusinessAccess"("businessAccess_id");

-- CreateIndex
CREATE UNIQUE INDEX "VenueAccess_accountVenueAccess_key" ON "VenueAccess"("accountVenueAccess");

-- CreateIndex
CREATE UNIQUE INDEX "VenueManager_venueManagerId_key" ON "VenueManager"("venueManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessManager_businessManagerId_key" ON "BusinessManager"("businessManagerId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_account_roleId_fkey" FOREIGN KEY ("account_roleId") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetail_bannedPersonId_fkey" FOREIGN KEY ("banDetail_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanLocation" ADD CONSTRAINT "BanLocation_banLocation_bannedPersonId_fkey" FOREIGN KEY ("banLocation_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanLocation" ADD CONSTRAINT "BanLocation_banLocation_venueId_fkey" FOREIGN KEY ("banLocation_venueId") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAccess" ADD CONSTRAINT "BusinessAccess_businessAccess_accountId_fkey" FOREIGN KEY ("businessAccess_accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAccess" ADD CONSTRAINT "BusinessAccess_businessAccess_businessId_fkey" FOREIGN KEY ("businessAccess_businessId") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueAccess" ADD CONSTRAINT "VenueAccess_venueAccess_accountId_fkey" FOREIGN KEY ("venueAccess_accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueAccess" ADD CONSTRAINT "VenueAccess_venueAccess_venueId_fkey" FOREIGN KEY ("venueAccess_venueId") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueManager" ADD CONSTRAINT "VenueManager_venueManager_accountId_fkey" FOREIGN KEY ("venueManager_accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueManager" ADD CONSTRAINT "VenueManager_venueManager_venueId_fkey" FOREIGN KEY ("venueManager_venueId") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessManager" ADD CONSTRAINT "BusinessManager_businessManager_accountId_fkey" FOREIGN KEY ("businessManager_accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessManager" ADD CONSTRAINT "BusinessManager_businessManager_businessId_fkey" FOREIGN KEY ("businessManager_businessId") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
