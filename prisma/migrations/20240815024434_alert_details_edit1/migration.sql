/*
  Warnings:

  - You are about to drop the `AlertInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlertInfo" DROP CONSTRAINT "AlertInfo_alertInfo_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "AlertInfo" DROP CONSTRAINT "AlertInfo_alertInfo_businessId_fkey";

-- DropTable
DROP TABLE "AlertInfo";

-- CreateTable
CREATE TABLE "AlertDetails" (
    "alertDetails_id" SERIAL NOT NULL,
    "alertDetails_bannedPersonId" INTEGER NOT NULL,
    "alertDetails_businessId" INTEGER NOT NULL,

    CONSTRAINT "AlertDetails_pkey" PRIMARY KEY ("alertDetails_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlertDetails_alertDetails_id_key" ON "AlertDetails"("alertDetails_id");

-- AddForeignKey
ALTER TABLE "AlertDetails" ADD CONSTRAINT "AlertDetails_alertDetails_bannedPersonId_fkey" FOREIGN KEY ("alertDetails_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertDetails" ADD CONSTRAINT "AlertDetails_alertDetails_businessId_fkey" FOREIGN KEY ("alertDetails_businessId") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
