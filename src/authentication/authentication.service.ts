import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account, Prisma } from '@prisma/client';
import { Response } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaResultError } from 'src/types';
import { isPrismaResultError } from 'src/utils';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenticationService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string, response:Response): Promise<string | PrismaResultError> {
    const account = await this.accountsService.findOneByEmail(email);

    // console.log(account)

    if (isPrismaResultError(account)) {
      return account;
    }

    if (await bcrypt.compare(password, account.account_password)) {
      const jwt = await this.jwtService.signAsync({ sub: account.account_id, email: account.account_email });

      response.cookie('jwt', jwt, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict',
      });

      return `logged in as ${account.account_name}`

    } else {
      throw new UnauthorizedException();
    }
  }
}
