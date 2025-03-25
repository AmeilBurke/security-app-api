import { BannedPerson } from '@prisma/client';
import { Request } from 'express';

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

export type PrismaResultError = {
  error_type: string,
  error_code: string,
  error_message: string
};