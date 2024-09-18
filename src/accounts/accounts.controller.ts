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
import { UpdateAccountAccessDto } from './dto/update-account-access.dto';
import { Account } from '@prisma/client';
import { RequestWithAccount } from 'src/types';
import { UpdateAccountDto } from './dto/update-account.dto';

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

  @Patch('/details/:id')
  updateAccountDetails(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account | string> {
    return this.accountsService.updateAccountDetails(Number(id), request, updateAccountDto);
  }

  @Patch('/access/:id')
  updateAccountAccess(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
    @Body() updateAccountAccessDto: UpdateAccountAccessDto,
  ): Promise<Account | string> {
    return this.accountsService.updateAccountAccess(Number(id), request, updateAccountAccessDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
  ): Promise<Account | string> {
    return this.accountsService.remove(Number(id), request);
  }
}
