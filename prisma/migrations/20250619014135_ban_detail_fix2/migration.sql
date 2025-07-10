/*
  Warnings:

  - The primary key for the `BanDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banDetails_id` on the `BanDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[banDetail_id]` on the table `BanDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BanDetail_banDetails_id_key";

-- AlterTable
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_pkey",
DROP COLUMN "banDetails_id",
ADD COLUMN     "banDetail_id" SERIAL NOT NULL,
ADD CONSTRAINT "BanDetail_pkey" PRIMARY KEY ("banDetail_id");

-- CreateIndex
CREATE UNIQUE INDEX "BanDetail_banDetail_id_key" ON "BanDetail"("banDetail_id");
