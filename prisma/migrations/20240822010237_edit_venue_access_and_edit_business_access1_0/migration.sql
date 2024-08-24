-- AlterTable
ALTER TABLE "AccountBusinessAccess" ADD COLUMN     "accountBusinessAccess_isBusinessOwner" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "AccountVenueAccess" ADD COLUMN     "accountVenueAccess_isVenueManager" BOOLEAN NOT NULL DEFAULT false;
