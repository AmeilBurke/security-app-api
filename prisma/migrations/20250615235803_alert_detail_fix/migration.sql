/*
  Warnings:

  - You are about to drop the column `alertDetails_alertReason` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetails_alertUploadedBy` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `alertDetails_startTime` on the `AlertDetail` table. All the data in the column will be lost.
  - Added the required column `alertDetail_alertReason` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertDetail_alertUploadedBy` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertDetail_startTime` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlertDetail" DROP CONSTRAINT "AlertDetail_alertDetails_alertUploadedBy_fkey";

-- AlterTable
ALTER TABLE "AlertDetail" DROP COLUMN "alertDetails_alertReason",
DROP COLUMN "alertDetails_alertUploadedBy",
DROP COLUMN "alertDetails_startTime",
ADD COLUMN     "alertDetail_alertReason" TEXT NOT NULL,
ADD COLUMN     "alertDetail_alertUploadedBy" INTEGER NOT NULL,
ADD COLUMN     "alertDetail_startTime" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_alertDetail_alertUploadedBy_fkey" FOREIGN KEY ("alertDetail_alertUploadedBy") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
