/*
  Warnings:

  - The primary key for the `BanDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banInfo_endDate` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banInfo_id` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banInfo_reason` on the `BanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `banInfo_startDate` on the `BanDetail` table. All the data in the column will be lost.
  - Added the required column `banDetail_endDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_reason` to the `BanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banDetail_startDate` to the `BanDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_pkey",
DROP COLUMN "banInfo_endDate",
DROP COLUMN "banInfo_id",
DROP COLUMN "banInfo_reason",
DROP COLUMN "banInfo_startDate",
ADD COLUMN     "banDetail_endDate" TEXT NOT NULL,
ADD COLUMN     "banDetail_id" SERIAL NOT NULL,
ADD COLUMN     "banDetail_reason" TEXT NOT NULL,
ADD COLUMN     "banDetail_startDate" TEXT NOT NULL,
ADD CONSTRAINT "BanDetail_pkey" PRIMARY KEY ("banDetail_id");
