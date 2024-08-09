/*
  Warnings:

  - You are about to drop the column `banInfo_id` on the `BannedPerson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BannedPerson" DROP CONSTRAINT "BannedPerson_banInfo_id_fkey";

-- AlterTable
ALTER TABLE "BanDetail" ADD COLUMN     "bannedPerson_id" INTEGER;

-- AlterTable
ALTER TABLE "BannedPerson" DROP COLUMN "banInfo_id";

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_bannedPerson_id_fkey" FOREIGN KEY ("bannedPerson_id") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE SET NULL ON UPDATE CASCADE;
