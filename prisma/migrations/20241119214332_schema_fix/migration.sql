-- DropForeignKey
ALTER TABLE "BanDetail" DROP CONSTRAINT "BanDetail_banDetails_venueBanId_fkey";

-- AddForeignKey
ALTER TABLE "BanDetail" ADD CONSTRAINT "BanDetail_banDetails_venueBanId_fkey" FOREIGN KEY ("banDetails_venueBanId") REFERENCES "Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;
