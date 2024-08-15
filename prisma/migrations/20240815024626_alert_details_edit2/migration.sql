/*
  Warnings:

  - You are about to drop the `AlertDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlertDetails" DROP CONSTRAINT "AlertDetails_alertDetails_bannedPersonId_fkey";

-- DropForeignKey
ALTER TABLE "AlertDetails" DROP CONSTRAINT "AlertDetails_alertDetails_businessId_fkey";

-- DropTable
DROP TABLE "AlertDetails";

-- CreateTable
CREATE TABLE "AlertDetail" (
    "alertDetails_id" SERIAL NOT NULL,
    "alertDetails_bannedPersonId" INTEGER NOT NULL,
    "alertDetails_businessId" INTEGER NOT NULL,

    CONSTRAINT "AlertDetail_pkey" PRIMARY KEY ("alertDetails_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlertDetail_alertDetails_id_key" ON "AlertDetail"("alertDetails_id");

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_alertDetails_bannedPersonId_fkey" FOREIGN KEY ("alertDetails_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertDetail" ADD CONSTRAINT "AlertDetail_alertDetails_businessId_fkey" FOREIGN KEY ("alertDetails_businessId") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
