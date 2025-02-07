import { BannedPerson } from '@prisma/client';

export type RequestWithAccount = Request & {
  account: {
    sub: number;
    email: string;
    iat: number;
    exp: number;
  };
};

export type BannedPersonWithSomeBanDetails = BannedPerson & {
  banDetails_reason: string;
  banDetails_banEndDate: string;
  banDetails_venueBanIds: string
};
