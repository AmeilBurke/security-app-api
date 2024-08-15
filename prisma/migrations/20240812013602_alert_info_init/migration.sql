-- CreateTable
CREATE TABLE "AlertInfo" (
    "alertInfo_id" SERIAL NOT NULL,
    "alertInfo_bannedPersonId" INTEGER NOT NULL,
    "alertInfo_businessId" INTEGER NOT NULL,

    CONSTRAINT "AlertInfo_pkey" PRIMARY KEY ("alertInfo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlertInfo_alertInfo_id_key" ON "AlertInfo"("alertInfo_id");

-- AddForeignKey
ALTER TABLE "AlertInfo" ADD CONSTRAINT "AlertInfo_alertInfo_bannedPersonId_fkey" FOREIGN KEY ("alertInfo_bannedPersonId") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertInfo" ADD CONSTRAINT "AlertInfo_alertInfo_businessId_fkey" FOREIGN KEY ("alertInfo_businessId") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
