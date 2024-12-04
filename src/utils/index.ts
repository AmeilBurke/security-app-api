import { Account } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

export const handleError = (error: unknown): string => {
  console.log(error);
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return `${error.meta.target[0]} has failed the unique constraint requirement`;
    }
    if(error.code === 'P2025') {
      return 'no record found in database by that id or name';
    }
  }
  return String(error);
};

export const getAccountInfoFromId = async (
  prisma: PrismaService,
  id: number,
): Promise<Account | string> => {
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
