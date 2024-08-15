-- CreateTable
CREATE TABLE "AccountBusinessAccess" (
    "accountBusinessAccess_id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "AccountBusinessAccess_pkey" PRIMARY KEY ("accountBusinessAccess_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountBusinessAccess_accountBusinessAccess_id_key" ON "AccountBusinessAccess"("accountBusinessAccess_id");

-- AddForeignKey
ALTER TABLE "AccountBusinessAccess" ADD CONSTRAINT "AccountBusinessAccess_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountBusinessAccess" ADD CONSTRAINT "AccountBusinessAccess_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
