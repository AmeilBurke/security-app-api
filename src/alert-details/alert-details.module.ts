import { Module } from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { AlertDetailsGateway } from './alert-details.gateway';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AlertDetailsController } from './alert-details.controller';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  controllers: [AlertDetailsController],
  providers: [
    AlertDetailsGateway,
    AlertDetailsService,
    PrismaService,
    JwtService,
    AuthenticationService,
    AccountsService
  ],
})
export class AlertDetailsModule {}
