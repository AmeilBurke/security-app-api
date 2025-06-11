import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account, Role } from '@prisma/client';
import { Response } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaService } from 'src/prisma.service';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import {
  addJwtCookieToRequest,
  handleError,
  isPrismaResultError,
} from 'src/utils';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenticationService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(
    email: string,
    password: string,
    response: Response,
  ): Promise<
    Omit<Account & { Role: Role }, 'account_password'> | PrismaResultError
  > {
    const account = await this.accountsService.findOneByEmail(email);

    // console.log(account)

    if (isPrismaResultError(account)) {
      return account;
    }

    if (await bcrypt.compare(password, account.account_password)) {
      await addJwtCookieToRequest(
        response,
        this.jwtService,
        account.account_id,
        account.account_email,
      );

      // return `${account.account_name}`
      // return account
      const { account_password, ...result } = account;

      // console.log(response.getHeaders())
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getAccountDetails(
    accountId: number,
    response: Response,
  ): Promise<
    Omit<Account & { Role: Role }, 'account_password'> | PrismaResultError
  > {
    try {
      const account = await this.prisma.account.findFirst({
        where: {
          account_id: accountId,
        },
        include: {
          Role: true,
        },
      });

      const { account_password, ...result } = account;

      await addJwtCookieToRequest(
        response,
        this.jwtService,
        account.account_id,
        account.account_email,
      );

      return result;
    } catch (error: unknown) {
      console.log(error);
      return handleError(error);
    }
  }
}
