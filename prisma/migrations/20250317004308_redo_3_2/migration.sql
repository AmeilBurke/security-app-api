/*
  Warnings:

  - The `alertDetails_startTime` column on the `AlertDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `banDetails_banStartDate` column on the `BanDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AlertDetail" DROP COLUMN "alertDetails_startTime",
ADD COLUMN     "alertDetails_startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BanDetail" DROP COLUMN "banDetails_banStartDate",
ADD COLUMN     "banDetails_banStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
