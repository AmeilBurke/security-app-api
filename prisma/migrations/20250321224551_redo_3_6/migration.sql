/*
  Warnings:

  - You are about to drop the column `alertDetail_imageName` on the `AlertDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AlertDetail" DROP COLUMN "alertDetail_imageName",
ADD COLUMN     "alertDetail_imagePath" TEXT;
