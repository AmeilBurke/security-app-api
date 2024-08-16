import { Prisma } from '@prisma/client';

export type TypeBannedPersonWithBanDetails = Prisma.BannedPersonGetPayload<{
  include: {
    BanDetail: true;
  };
}>;

export type TypeBusinessWithVenues = Prisma.BusinessGetPayload<{
  include: {
    Venue: true;
  };
}>;
