import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { BanDetailsModule } from './ban-details/ban-details.module';
import { BannedPersonsModule } from './banned-persons/banned-persons.module';
import { AlertDetailsModule } from './alert-details/alert-details.module';

@Module({
  imports: [RolesModule, BanDetailsModule, BannedPersonsModule, AlertDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
