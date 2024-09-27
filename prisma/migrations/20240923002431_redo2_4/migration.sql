/*
  Warnings:

  - You are about to drop the column `business_id` on the `Venue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_business_id_fkey";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "business_id",
ADD COLUMN     "venue_businessId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_venue_businessId_fkey" FOREIGN KEY ("venue_businessId") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
