/*
  Warnings:

  - The `banDetails_banEndDate` column on the `BanDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BanDetail" DROP COLUMN "banDetails_banEndDate",
ADD COLUMN     "banDetails_banEndDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
