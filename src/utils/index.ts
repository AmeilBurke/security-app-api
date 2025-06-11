import { Account } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';
import { PrismaResultError } from 'src/types';
import { Response } from 'express';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';

export const handleError = (error: unknown): PrismaResultError => {
  if (error instanceof PrismaClientKnownRequestError) {
    return {
      error_type: 'PrismaClientKnownRequestError',
      error_code: error.code,
      error_message: error.message,
    };
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return {
      error_type: 'PrismaClientUnknownRequestError',
      error_code: 'PCURE',
      error_message: error.message,
    };
  }

  console.log(error);

  return {
    error_type: 'UnknownError',
    error_code: '500',
    error_message: 'there was an unexpected error',
  };
};

export const isPrismaResultError = (
  object: any,
): object is PrismaResultError => {
  return (
    typeof object === 'object' &&
    object !== null &&
    typeof object.error_type === 'string' &&
    typeof object.error_code === 'string' &&
    typeof object.error_message === 'string'
  );
};

export const noRequestAccountError = (): PrismaResultError => {
  return {
    error_type: 'no request account',
    error_code: '400',
    error_message: 'no account details were sent with request',
  };
};

export const noFileReceivedError = (): PrismaResultError => {
  return {
    error_type: 'no file received',
    error_code: '400',
    error_message: 'no file was sent with request',
  };
};

export const accountIsUnauthorized = (): PrismaResultError => {
  return {
    error_type: 'account unauthorized',
    error_code: '401',
    error_message:
      'the account requesting this does not have the required authorization',
  };
};

export const invalidDayJsDate = (): PrismaResultError => {
  return {
    error_type: 'invalid dayjs date',
    error_code: '400',
    error_message:
      'the date given could not be converted to a valid dayjs date',
  };
};

export const getAccountInfoFromId = async (
  prisma: PrismaService,
  id: number,
): Promise<Account | PrismaResultError> => {
  try {
    return await prisma.account.findFirstOrThrow({
      where: {
        account_id: id,
      },
    });
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const isAccountAdminRole = async (
  prisma: PrismaService,
  account: Account,
): Promise<boolean> => {
  const role = await prisma.role.findFirstOrThrow({
    where: {
      role_name: 'admin',
    },
  });

  if (account.account_roleId === role.role_id) {
    return true;
  } else {
    return false;
  }
};

export const isAccountSecurityRole = async (
  prisma: PrismaService,
  account: Account,
): Promise<boolean> => {
  const role = await prisma.role.findFirstOrThrow({
    where: {
      role_name: 'security',
    },
  });

  if (account.account_roleId === role.role_id) {
    return true;
  } else {
    return false;
  }
};

export const isAccountVenueManagerRole = async (
  prisma: PrismaService,
  account: Account,
): Promise<boolean> => {
  const role = await prisma.role.findFirstOrThrow({
    where: {
      role_name: 'venue manager',
    },
  });

  if (account.account_roleId === role.role_id) {
    return true;
  } else {
    return false;
  }
};

export const addJwtCookieToRequest = async (
  response: Response,
  jwtService: JwtService,
  accountId: number,
  accountEmail: string,
) => {
  const jwt = await jwtService.signAsync({
    sub: accountId,
    email: accountEmail,
  });

  response.cookie('jwt', jwt, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
};

export const capitalizeString = (text: string) => {
  return text.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
