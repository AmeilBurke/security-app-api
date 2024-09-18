import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountAccessDto } from './dto/update-account-access.dto';
import { Account } from '@prisma/client';
import { RequestWithAccount } from 'src/types';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<Account | string>;
    findAll(request: RequestWithAccount): Promise<Account[] | string>;
    findOne(id: string, request: RequestWithAccount): Promise<Account | string>;
    updateAccountDetails(id: string, request: RequestWithAccount, updateAccountDto: UpdateAccountDto): Promise<Account | string>;
    updateAccountAccess(id: string, request: RequestWithAccount, updateAccountAccessDto: UpdateAccountAccessDto): Promise<Account | string>;
    remove(id: string, request: RequestWithAccount): Promise<Account | string>;
}
