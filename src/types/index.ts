import type { Account, BannedPerson } from '@prisma/client';
import type { Request } from 'express';

export type Role = {
  id: number;
  name: string;
};

export type RequestWithAccount = Request & {
  account: {
    sub: number;
    email: string;
    iat: number;
    exp: number;
  };
};

export type AccountWithRoleNoPassword = Omit<Account & { role: Role }, "password" | 'roleId'>

export type BannedPersonWithSomeBanDetails = BannedPerson & {
  banDetails_reason: string;
  banDetails_banEndDate: string;
  banDetails_venueBanIds: string;
};

export type PrismaResultError = {
  error_type: string;
  error_code: string;
  error_message: string;
};
