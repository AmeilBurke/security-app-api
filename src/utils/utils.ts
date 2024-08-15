import { PrismaService } from 'src/prisma.service';

export const getFullAccountInfoFromEmail = async (
  prisma: PrismaService,
  uploaderEmail: string,
) => {
  return await prisma.account.findFirstOrThrow({
    where: {
      account_email: uploaderEmail,
    },
  });
};

export const getSecurityRoleFromDB = async (prisma: PrismaService) => {
  return await prisma.role.findFirstOrThrow({
    where: {
      role_name: 'security',
    },
  });
};
