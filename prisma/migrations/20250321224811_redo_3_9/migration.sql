/*
  Warnings:

  - Made the column `alertDetail_imagePath` on table `AlertDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AlertDetail" ALTER COLUMN "alertDetail_imagePath" SET NOT NULL;
