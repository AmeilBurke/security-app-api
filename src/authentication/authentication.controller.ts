import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { Public } from './public.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  create(
    @Body() userLogin: { user_email: string; user_password: string },
  ): Promise<{ access_token: string } | string> {
    return this.authenticationService.signIn(
      userLogin.user_email,
      userLogin.user_password,
    );
  }

  @Get('profile')
  getProfile(@Request() request) {
    console.log(request.account);
    return request.account;
  }
}