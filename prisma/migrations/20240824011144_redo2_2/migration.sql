/*
  Warnings:

  - A unique constraint covering the columns `[account_email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_account_email_key" ON "Account"("account_email");
