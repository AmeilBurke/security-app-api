import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

export const getRoleFromDB = async (
  prisma: PrismaService,
  roleName: string,
) => {
  return await prisma.role.findFirstOrThrow({
    where: {
      role_name: roleName,
    },
  });
};

export const getAccountWithEmail = async (
  prisma: PrismaService,
  email: string,
) => {
  try {
    return await prisma.account.findFirstOrThrow({
      where: {
        account_email: email,
      },
    });
  } catch (error: unknown) {
    handleError(error);
  }
};

export const handleError = (error: unknown) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return 'you cannot use the same email for multiple accounts';
    }
    if (error.code === 'P2025') {
      return 'not found error';
    }
    return error.message;
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return error.message;
  }
  return String(error);
};
