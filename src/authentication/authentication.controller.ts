import { Controller, Post, Body, Get, Res, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from './public.guard';
import { Account, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  async create(
    @Body() userLogin: { user_email: string; user_password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authenticationService.signIn(
      userLogin.user_email,
      userLogin.user_password,
      response,
    );
  }

  @Get('profile')
  async getProfile(
    @Req() request: Request & { account: {sub: number, email: string, iat: number, exp: number} }
  ) {
    return request.account;
  }
}
