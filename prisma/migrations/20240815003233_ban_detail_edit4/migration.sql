/*
  Warnings:

  - You are about to drop the column `bannedPerson_isBanPending` on the `BannedPerson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BanDetail" ADD COLUMN     "banDetail_isBanPending" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "BannedPerson" DROP COLUMN "bannedPerson_isBanPending";
