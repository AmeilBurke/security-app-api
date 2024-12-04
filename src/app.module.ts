import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { BannedPeopleModule } from './banned-people/banned-people.module';
import { MulterModule } from '@nestjs/platform-express';
import { AlertDetailsModule } from './alert-details/alert-details.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountsModule,
    BannedPeopleModule,
    AlertDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
