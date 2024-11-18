import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
