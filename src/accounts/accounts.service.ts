import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateAccountAccessDto } from './dto/update-account-access.dto';
import { getAccountWithEmail, getRoleFromDB, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { encryptPassword } from 'src/bcrypt/bcrypt';
import { RequestWithAccount } from 'src/types';
import { Prisma, VenueManager } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createAccountDto: CreateAccountDto,
  ) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        createAccountDto.account_password = await encryptPassword(
          createAccountDto.account_password,
        );

        const newAccount = await this.prisma.account.create({
          data: {
            account_email: createAccountDto.account_email
              .toLocaleLowerCase()
              .trim(),
            account_name: createAccountDto.account_name
              .toLocaleLowerCase()
              .trim(),
            account_password: createAccountDto.account_password,
            account_roleId: createAccountDto.account_roleId,
          },
        });

        createAccountDto.account_allowedVenues.map(async (venueId: number) => {
          await this.prisma.venueAccess.createMany({
            data: {
              venueAccess_accountId: newAccount.account_id,
              venueAccess_venueId: venueId,
            },
          });
        });

        createAccountDto.account_allowedBusinesses.map(
          async (businessId: number) => {
            await this.prisma.businessAccess.createMany({
              data: {
                businessAccess_accountId: newAccount.account_id,
                businessAccess_businessId: businessId,
              },
            });
          },
        );

        if (createAccountDto.account_venueManager) {
          createAccountDto.account_venueManager.map(async (venueId: number) => {
            await this.prisma.venueManager.create({
              data: {
                venueManager_accountId: newAccount.account_id,
                venueManager_venueId: venueId,
              },
            });
          });
        }

        if (createAccountDto.account_businessManager) {
          createAccountDto.account_businessManager.map(
            async (businessId: number) => {
              await this.prisma.businessManager.create({
                data: {
                  businessManager_accountId: newAccount.account_id,
                  businessManager_businessId: businessId,
                },
              });
            },
          );
        }
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        return await this.prisma.account.findMany({
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

  async findOne(id: number, request: RequestWithAccount) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      console.log(request.account);

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        return await this.prisma.account.findFirstOrThrow({
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

  async findOneToSignIn(email: string) {
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

  async updateAccountDetails(
    id: number,
    request: RequestWithAccount,
    updateAccountDto: UpdateAccountDto,
  ) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        if (updateAccountDto.account_password) {
          updateAccountDto.account_password = await encryptPassword(
            updateAccountDto.account_password,
          );
        }

        return await this.prisma.account.update({
          where: {
            account_id: id,
          },
          data: {
            account_email: updateAccountDto.account_email
              ? updateAccountDto.account_email.toLocaleLowerCase().trim()
              : updateAccountDto.account_email,
            account_name: updateAccountDto.account_name
              ? updateAccountDto.account_name.toLocaleLowerCase().trim()
              : updateAccountDto.account_name,
            account_password: updateAccountDto.account_password,
            account_roleId: updateAccountDto.account_roleId,
          },
        });
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async updateAccountAccess(
    id: number,
    request: RequestWithAccount,
    updateAccountAccessDto: UpdateAccountAccessDto,
  ) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        await this.prisma.venueAccess.deleteMany({
          where: {
            venueAccess_accountId: id,
          },
        });

        updateAccountAccessDto.account_allowedVenues.map(
          async (venueId: number) => {
            try {
              await this.prisma.venueAccess.create({
                data: {
                  venueAccess_accountId: id,
                  venueAccess_venueId: venueId,
                },
              });
            } catch (error: unknown) {
              return handleError(error);
            }
          },
        );

        await this.prisma.businessAccess.deleteMany({
          where: {
            businessAccess_accountId: id,
          },
        });

        updateAccountAccessDto.account_allowedBusinesses.map(
          async (businessId: number) => {
            try {
              await this.prisma.businessAccess.create({
                data: {
                  businessAccess_accountId: id,
                  businessAccess_businessId: businessId,
                },
              });
            } catch (error: unknown) {
              return handleError(error);
            }
          },
        );

        if (updateAccountAccessDto.account_venueManager) {
          await this.prisma.venueManager.deleteMany({
            where: {
              venueManager_accountId: id,
            },
          });

          updateAccountAccessDto.account_venueManager.map(
            async (venueId: number) => {
              try {
                await this.prisma.venueManager.create({
                  data: {
                    venueManager_accountId: id,
                    venueManager_venueId: venueId,
                  },
                });
              } catch (error: unknown) {
                return handleError(error);
              }
            },
          );
        }

        if (updateAccountAccessDto.account_businessManager) {
          await this.prisma.businessManager.deleteMany({
            where: {
              businessManager_accountId: id,
            },
          });

          updateAccountAccessDto.account_businessManager.map(
            async (venueId: number) => {
              try {
                await this.prisma.businessManager.create({
                  data: {
                    businessManager_accountId: id,
                    businessManager_businessId: venueId,
                  },
                });
              } catch (error: unknown) {
                return handleError(error);
              }
            },
          );
        }

        return await this.prisma.account.findFirstOrThrow({
          where: {
            account_id: id,
          },
          include: {
            VenueAccess: true,
            BusinessAccess: true,
            VenueManager: true,
            BusinessManager: true,
          },
        });
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(id: number, request: RequestWithAccount) {
    const uploaderAccount = await getAccountWithEmail(
      this.prisma,
      request.account.email,
    );

    if (uploaderAccount === undefined) {
      return 'uploaderAccount is undefined';
    }

    const adminRole = await getRoleFromDB(this.prisma, 'admin');

    if (uploaderAccount.account_roleId === adminRole.role_id) {
      return await this.prisma.account.delete({
        where: {
          account_id: id,
        },
      });
    }
  }
}
