import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { encryptPassword } from 'src/bcrypt/bcrypt';
import { Account } from '@prisma/client';
import {
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
} from 'src/utils';
import { RequestWithAccount } from 'src/types';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createAccountDto: CreateAccountDto,
  ): Promise<Account | string> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        createAccountDto.account_password = await encryptPassword(
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

        if (createAccountDto.account_venueAccessIds) {
          createAccountDto.account_venueAccessIds.map(
            async (venueId: number) => {
              try {
                await this.prisma.venueAccess.create({
                  data: {
                    venueAccess_accountId: newAccount.account_id,
                    venueAccess_venueId: venueId,
                  },
                });
              } catch (error: unknown) {
                console.log(error);
              }
            },
          );
        }

        if (createAccountDto.account_venueManagerIds) {
          createAccountDto.account_venueManagerIds.map(
            async (venueId: number) => {
              try {
                await this.prisma.venueManager.create({
                  data: {
                    venueManager_accountId: newAccount.account_id,
                    venueManager_venueId: venueId,
                  },
                });
              } catch (error: unknown) {
                console.log(error);
              }
            },
          );
        }

        // if (createAccountDto.account_venueManagerIds) {
        //   try {
        //     test = createAccountDto.account_venueManagerIds.map(
        //       (venueId: number) => {
        //         return {
        //           venueManager_venueId: venueId,
        //           venueManager_accountId: newAccount.account_id,
        //         };
        //       },
        //     );
        //   } catch (error: unknown) {
        //     console.log(error);
        //   }

        //   await this.prisma.venueManager.createMany({
        //     data: test,
        //   });
        // }

        return this.prisma.account.findFirstOrThrow({
          where: {
            account_id: newAccount.account_id,
          },
          include: {
            VenueAccess: true,
            VenueManager: true,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<Account[] | string> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return this.prisma.account.findMany({
          orderBy: {
            account_id: 'asc',
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOne(
    request: RequestWithAccount,
    id: number,
  ): Promise<Account | string> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return this.prisma.account.findFirstOrThrow({
          where: {
            account_id: id,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOneByEmail(email: string): Promise<Account | string> {
    try {
      return await this.prisma.account.findFirstOrThrow({
        where: {
          account_email: email,
        },
      });
    } catch (error) {
      return 'error, this needs completing';
    }
  }

  async update(
    request: RequestWithAccount,
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account | string> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (
        (await isAccountAdminRole(this.prisma, requestAccount)) ||
        requestAccount.account_id === id
      ) {
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
              ? await encryptPassword(updateAccountDto.account_password)
              : updateAccountDto.account_password,
            account_roleId: updateAccountDto.account_roleId,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(
    request: RequestWithAccount,
    id: number,
  ): Promise<Account | string> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return this.prisma.account.delete({
          where: {
            account_id: id,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
