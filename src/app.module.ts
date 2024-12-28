import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { BannedPeopleModule } from './banned-people/banned-people.module';
import { AlertDetailsModule } from './alert-details/alert-details.module';
import { ScheduleModule } from '@nestjs/schedule';
import { VenuesModule } from './venues/venues.module';
import { BanDetailsModule } from './ban-details/ban-details.module';
import { VenueManagersModule } from './venue-managers/venue-managers.module';
import { VenueBansModule } from './venue-bans/venue-bans.module';
import { VenueAccessModule } from './venue-access/venue-access.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountsModule,
    BannedPeopleModule,
    AlertDetailsModule,
    ScheduleModule.forRoot(),
    VenuesModule,
    BanDetailsModule,
    VenueManagersModule,
    VenueBansModule,
    VenueAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
