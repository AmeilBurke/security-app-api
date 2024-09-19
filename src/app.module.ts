import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { BannedPeopleModule } from './banned-people/banned-people.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AlertDetailsModule } from './alert-details/alert-details.module';
import { BusinessesModule } from './businesses/businesses.module';

@Module({
  imports: [
    AccountsModule,
    BannedPeopleModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AlertDetailsModule,
    BusinessesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
