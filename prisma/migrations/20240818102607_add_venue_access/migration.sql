-- CreateTable
CREATE TABLE "AccountVenueAccess" (
    "accountVenueAccess" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "AccountVenueAccess_pkey" PRIMARY KEY ("accountVenueAccess")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountVenueAccess_accountVenueAccess_key" ON "AccountVenueAccess"("accountVenueAccess");

-- AddForeignKey
ALTER TABLE "AccountVenueAccess" ADD CONSTRAINT "AccountVenueAccess_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountVenueAccess" ADD CONSTRAINT "AccountVenueAccess_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
