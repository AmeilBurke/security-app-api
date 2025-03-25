import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { hashPassword } from 'src/bcrypt/bcrypt';
import {
  Account,
  Prisma,
  Role,
  VenueAccess,
  VenueManager,
} from '@prisma/client';
import {
  accountIsUnauthorized,
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
  isAccountSecurityRole,
  isAccountVenueManagerRole,
  isPrismaResultError,
  noRequestAccountError,
} from 'src/utils';
import { PrismaResultError, RequestWithAccount } from 'src/types';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createAccountDto: CreateAccountDto,
  ): Promise<
    | Prisma.AccountGetPayload<{
        include: {
          VenueAccess: true;
          VenueManager: true;
          Role: true;
        };
      }>
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        createAccountDto.account_password = await hashPassword(
          createAccountDto.account_password,
        );

        const newAccount = await this.prisma.account.create({
          data: {
            account_name: createAccountDto.account_name
              .toLocaleLowerCase()
              .trim(),
            account_email: createAccountDto.account_email
              .toLocaleLowerCase()
              .trim(),
            account_password: createAccountDto.account_password,
            account_roleId: createAccountDto.account_roleId,
          },
        });

        const allVenueIds = await this.prisma.venue.findMany({
          select: {
            venue_id: true,
          },
        });

        if (
          (await isAccountAdminRole(this.prisma, newAccount)) ||
          (await isAccountSecurityRole(this.prisma, newAccount))
        ) {
          allVenueIds.map(async (venueId) => {
            await this.prisma.venueAccess.create({
              data: {
                venueAccess_venueId: venueId.venue_id,
                venueAccess_accountId: newAccount.account_id,
              },
            });
          });
        }

        if (await isAccountVenueManagerRole(this.prisma, newAccount)) {
          createAccountDto.account_venueManagerIds.map(async (venueIds) => {
            await this.prisma.venueAccess.create({
              data: {
                venueAccess_venueId: venueIds,
                venueAccess_accountId: newAccount.account_id,
              },
            });
            await this.prisma.venueManager.create({
              data: {
                venueManager_venueId: venueIds,
                venueManager_accountId: newAccount.account_id,
              },
            });
          });
        }

        return this.prisma.account.findFirstOrThrow({
          where: {
            account_id: newAccount.account_id,
          },
          include: {
            VenueAccess: true,
            VenueManager: true,
            Role: true,
          },
        });
      } else {
        return accountIsUnauthorized();
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  // Used if the database is wiped to create accounts without admin privileges
  async createSecret(createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.prisma.account.create({
      data: {
        account_email: createAccountDto.account_email,
        account_name: createAccountDto.account_name,
        account_password: await hashPassword(createAccountDto.account_password),
        account_roleId: createAccountDto.account_roleId,
      },
    });
  }

  async findAll(request: RequestWithAccount): Promise<
    | Prisma.AccountGetPayload<{
        omit: { account_password: true };
        include: { Role: true };
      }>[]
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      return this.prisma.account.findMany({
        omit: {
          account_password: true,
        },
        orderBy: {
          account_id: 'asc',
        },
        include: {
          Role: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOne(
    request: RequestWithAccount,
    id: number,
  ): Promise<
    | Prisma.AccountGetPayload<{
        omit: { account_password: true };
        include: { Role: true };
      }>
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      if (
        (await isAccountAdminRole(this.prisma, requestAccount)) ||
        requestAccount.account_id === id
      ) {
        return this.prisma.account.findFirstOrThrow({
          where: {
            account_id: id,
          },
          omit: {
            account_password: true,
          },
          include: {
            Role: true,
          },
        });
      } else {
        return accountIsUnauthorized();
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOneByEmail(email: string): Promise<Account | PrismaResultError> {
    try {
      return await this.prisma.account.findFirstOrThrow({
        where: {
          account_email: email,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    request: RequestWithAccount,
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<
    | Prisma.AccountGetPayload<{
        omit: { account_password: true };
        include: { VenueAccess: true; VenueManager: true; Role: true };
      }>
    | PrismaResultError
  > {
    try {
      // need to change this to check for jwt in cookie
      // maybe get jwt and decrypt then get request account
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      if (
        (await isAccountAdminRole(this.prisma, requestAccount)) ||
        requestAccount.account_id === id
      ) {
        if (updateAccountDto.account_venueAccessIds) {
          await this.prisma.venueAccess.deleteMany({
            where: {
              venueAccess_accountId: id,
            },
          });

          updateAccountDto.account_venueAccessIds.map(
            async (venueId: number) => {
              await this.prisma.venueAccess.create({
                data: {
                  venueAccess_accountId: id,
                  venueAccess_venueId: venueId,
                },
              });
            },
          );
        }

        if (updateAccountDto.account_venueManagerIds) {
          await this.prisma.venueManager.deleteMany({
            where: {
              venueManager_accountId: id,
            },
          });

          updateAccountDto.account_venueAccessIds.map(
            async (venueId: number) => {
              await this.prisma.venueManager.create({
                data: {
                  venueManager_accountId: id,
                  venueManager_venueId: venueId,
                },
              });
            },
          );
        }

        return this.prisma.account.update({
          where: {
            account_id: id,
          },
          data: {
            account_name: updateAccountDto.account_name
              ? updateAccountDto.account_name.toLocaleLowerCase().trim()
              : updateAccountDto.account_name,
            account_email: updateAccountDto.account_email
              ? updateAccountDto.account_email.toLocaleLowerCase().trim()
              : updateAccountDto.account_email,
            account_password: updateAccountDto.account_password
              ? await hashPassword(updateAccountDto.account_password)
              : updateAccountDto.account_password,
            account_roleId: updateAccountDto.account_roleId,
          },
          include: {
            VenueAccess: true,
            VenueManager: true,
            Role: true,
          },
          omit: {
            account_password: true,
          },
        });
      } else {
        return accountIsUnauthorized();
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(
    request: RequestWithAccount,
    id: number,
  ): Promise<Account | PrismaResultError> {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return this.prisma.account.delete({
          where: {
            account_id: id,
          },
        });
      } else {
        return accountIsUnauthorized();
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
