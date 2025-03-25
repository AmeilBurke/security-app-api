/*
  Warnings:

  - You are about to drop the column `bannedPerson_imageName` on the `BannedPerson` table. All the data in the column will be lost.
  - Added the required column `bannedPerson_imagePath` to the `BannedPerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BannedPerson" DROP COLUMN "bannedPerson_imageName",
ADD COLUMN     "bannedPerson_imagePath" TEXT NOT NULL;
