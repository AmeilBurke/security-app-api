import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from '@prisma/client';
import { RequestWithAccount } from 'src/types';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<Account | string>;
    findAll(request: RequestWithAccount): Promise<Account[] | string>;
    findOne(id: string, request: RequestWithAccount): Promise<Account | string>;
    update(id: string, request: RequestWithAccount, updateAccountDto: UpdateAccountDto): Promise<Account | string>;
    remove(id: string, request: RequestWithAccount): Promise<Account | string>;
}
