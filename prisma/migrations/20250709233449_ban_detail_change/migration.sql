/*
  Warnings:

  - You are about to drop the column `banDetail_venueBanId` on the `BanDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetail_venueBanId_fkey";

-- AlterTable
ALTER TABLE "BanDetail" DROP COLUMN "banDetail_venueBanId";

-- CreateTable
CREATE TABLE "BanDetailVenue" (
    "banDetailVenue_id" SERIAL NOT NULL,
    "banDetail_id" INTEGER NOT NULL,
    "venue_id" INTEGER NOT NULL,

    CONSTRAINT "BanDetailVenue_pkey" PRIMARY KEY ("banDetailVenue_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BanDetailVenue_banDetailVenue_id_key" ON "BanDetailVenue"("banDetailVenue_id");

-- AddForeignKey
ALTER TABLE "BanDetailVenue" ADD CONSTRAINT "BanDetailVenue_banDetail_id_fkey" FOREIGN KEY ("banDetail_id") REFERENCES "BanDetail"("banDetail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanDetailVenue" ADD CONSTRAINT "BanDetailVenue_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;
