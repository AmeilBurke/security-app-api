import { Controller, Post, Body, Get, Res, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from './public.guard';
import { Response } from 'express';
import { RequestWithAccount } from 'src/types';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('sign-in')
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
    @Req()
    request: RequestWithAccount,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authenticationService.getAccountDetails(
      request.account.sub,
      response,
    );
  }

  @Public()
  @Get('sign-out')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      partitioned: true,
      path: '/',
    });
    return 'you have been signed out';
  }
}
