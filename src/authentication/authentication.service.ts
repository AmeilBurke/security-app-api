import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { encryptString } from 'src/bcrypt/bcrypt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenticationService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const account = await this.accountsService.findOneByEmail(email);
    if (typeof account === 'string') {
      return 'there was an error signing in, check your email & try again';
    }

    if (await bcrypt.compare(password, account.account_password)) {
      const payload = { sub: account.account_id, email: account.account_email };
      // return { access_token: await this.jwtService.signAsync(payload) };
      return await encryptString(await this.jwtService.signAsync(payload));
      // access_token: await hashPassword(await this.jwtService.signAsync(payload)),
    } else {
      throw new UnauthorizedException();
    }
  }
}
