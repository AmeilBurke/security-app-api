/*
  Warnings:

  - You are about to drop the `VenueBan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VenueBan" DROP CONSTRAINT "VenueBan_venueBan_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "VenueBan" DROP CONSTRAINT "VenueBan_venueBan_venueId_fkey";

-- DropTable
DROP TABLE "VenueBan";
