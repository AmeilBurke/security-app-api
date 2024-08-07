-- CreateTable
CREATE TABLE "Accounts" (
    "account_id" SERIAL NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_email" TEXT NOT NULL,
    "account_password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "BanInfo" (
    "banInfo_id" SERIAL NOT NULL,
    "banInfo_reason" TEXT NOT NULL,
    "banInfo_startDate" TEXT NOT NULL,
    "banInfo_endDate" TEXT NOT NULL,

    CONSTRAINT "BanInfo_pkey" PRIMARY KEY ("banInfo_id")
);

-- CreateTable
CREATE TABLE "BannedPerson" (
    "bannedPerson_id" SERIAL NOT NULL,
    "bannedPerson_image" TEXT,
    "bannedPerson_name" TEXT NOT NULL,
    "bannedPerson_isAlertActive" BOOLEAN NOT NULL,
    "bannedPerson_isBanPending" BOOLEAN NOT NULL,
    "banInfo_id" INTEGER NOT NULL,

    CONSTRAINT "BannedPerson_pkey" PRIMARY KEY ("bannedPerson_id")
);

-- CreateTable
CREATE TABLE "BanList" (
    "banList_id" SERIAL NOT NULL,
    "bennedPerson_id" INTEGER NOT NULL,
    "venue_id" INTEGER NOT NULL,

    CONSTRAINT "BanList_pkey" PRIMARY KEY ("banList_id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "venue_id" SERIAL NOT NULL,
    "venue_name" TEXT NOT NULL,
    "venue_logo" TEXT,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("venue_id")
);

-- CreateTable
CREATE TABLE "Business" (
    "business_id" SERIAL NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_logo" TEXT,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("business_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_account_id_key" ON "Accounts"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "BanList_banList_id_key" ON "BanList"("banList_id");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_venue_id_key" ON "Venue"("venue_id");

-- CreateIndex
CREATE UNIQUE INDEX "Business_business_id_key" ON "Business"("business_id");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannedPerson" ADD CONSTRAINT "BannedPerson_banInfo_id_fkey" FOREIGN KEY ("banInfo_id") REFERENCES "BanInfo"("banInfo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanList" ADD CONSTRAINT "BanList_banList_id_fkey" FOREIGN KEY ("banList_id") REFERENCES "BannedPerson"("bannedPerson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanList" ADD CONSTRAINT "BanList_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
