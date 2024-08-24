/*
  Warnings:

  - You are about to drop the column `business_id` on the `AccountVenueAccess` table. All the data in the column will be lost.
  - Added the required column `venue_id` to the `AccountVenueAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountVenueAccess" DROP CONSTRAINT "AccountVenueAccess_business_id_fkey";

-- AlterTable
ALTER TABLE "AccountVenueAccess" DROP COLUMN "business_id",
ADD COLUMN     "venue_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AccountVenueAccess" ADD CONSTRAINT "AccountVenueAccess_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;
