/*
  Warnings:

  - You are about to drop the column `alertDetail_imagePath` on the `AlertDetail` table. All the data in the column will be lost.
  - You are about to drop the column `bannedPerson_imagePath` on the `BannedPerson` table. All the data in the column will be lost.
  - Added the required column `alertDetail_imageName` to the `AlertDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannedPerson_imageName` to the `BannedPerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertDetail" DROP COLUMN "alertDetail_imagePath",
ADD COLUMN     "alertDetail_imageName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BannedPerson" DROP COLUMN "bannedPerson_imagePath",
ADD COLUMN     "bannedPerson_imageName" TEXT NOT NULL;
