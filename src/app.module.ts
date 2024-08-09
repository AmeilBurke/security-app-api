import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { BanDetailsModule } from './ban-details/ban-details.module';

@Module({
  imports: [RolesModule, BanDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
