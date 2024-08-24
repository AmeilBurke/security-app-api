-- AlterTable
ALTER TABLE "AccountBusinessAccess" ALTER COLUMN "accountBusinessAccess_isBusinessOwner" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AccountVenueAccess" ALTER COLUMN "accountVenueAccess_isVenueManager" DROP DEFAULT;
