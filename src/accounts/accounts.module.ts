import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService],
  exports: [AccountsService],
})
export class AccountsModule {}
