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
import { Public } from 'src/authentication/public.guard';
import { RequestWithAccount } from 'src/types';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // @Public()
  @Post()
  create(
    @Req() request: RequestWithAccount,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(request, createAccountDto);
  }

  @Public()
  @Post('/secret')
  createSecret(
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.createSecret(createAccountDto);
  }


  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.accountsService.findAll(request);
  }

  @Get(':id')
  findOne(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.accountsService.findOne(request, Number(id));
  }

  @Patch(':id')
  update(
    @Req() request: RequestWithAccount,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(request, Number(id), updateAccountDto);
  }

  @Delete(':id')
  remove(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.accountsService.remove(request, Number(id));
  }
}
