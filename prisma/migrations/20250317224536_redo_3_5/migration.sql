-- AlterTable
ALTER TABLE "AlertDetail" ALTER COLUMN "alertDetails_startTime" DROP DEFAULT,
ALTER COLUMN "alertDetails_startTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BanDetail" ALTER COLUMN "banDetails_banStartDate" DROP DEFAULT,
ALTER COLUMN "banDetails_banStartDate" SET DATA TYPE TEXT,
ALTER COLUMN "banDetails_banEndDate" SET DATA TYPE TEXT;
