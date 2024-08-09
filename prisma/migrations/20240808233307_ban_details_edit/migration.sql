/*
  Warnings:

  - You are about to drop the `BanInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BannedPerson" DROP CONSTRAINT "BannedPerson_banInfo_id_fkey";

-- DropTable
DROP TABLE "BanInfo";

-- CreateTable
CREATE TABLE "BanDetail" (
    "banInfo_id" SERIAL NOT NULL,
    "banInfo_reason" TEXT NOT NULL,
    "banInfo_startDate" TEXT NOT NULL,
    "banInfo_endDate" TEXT NOT NULL,

    CONSTRAINT "BanDetail_pkey" PRIMARY KEY ("banInfo_id")
);

-- AddForeignKey
ALTER TABLE "BannedPerson" ADD CONSTRAINT "BannedPerson_banInfo_id_fkey" FOREIGN KEY ("banInfo_id") REFERENCES "BanDetail"("banInfo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
