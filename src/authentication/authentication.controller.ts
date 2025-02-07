import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from './public.guard';
import { RequestWithAccount } from 'src/types';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  create(
    @Body() userLogin: { user_email: string; user_password: string },
  ): Promise<Buffer | string> {
    return this.authenticationService.signIn(
      userLogin.user_email,
      userLogin.user_password,
    );
  }

  @Get('profile')
  getProfile(@Request() request: RequestWithAccount): {
    sub: number;
    email: string;
    iat: number;
    exp: number;
  } {
    return request.account;
  }
}
