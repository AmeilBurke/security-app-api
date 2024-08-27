import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from '@prisma/client';
import { RequestWithAccount } from 'src/types';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(
    @Req() request: RequestWithAccount,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account | string> {
    return this.accountsService.create(request, createAccountDto);
  }

  @Get()
  findAll(@Req() request: RequestWithAccount): Promise<Account[] | string> {
    return this.accountsService.findAll(request);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
  ): Promise<Account | string> {
    return this.accountsService.findOne(Number(id), request);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account | string> {
    return this.accountsService.update(Number(id), request, updateAccountDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
  ): Promise<Account | string> {
    return this.accountsService.remove(Number(id), request);
  }
}
