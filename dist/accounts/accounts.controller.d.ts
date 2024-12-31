import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { RequestWithAccount } from 'src/types';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    }>;
    findAll(request: RequestWithAccount): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    }[]>;
    findOne(request: RequestWithAccount, id: string): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    }>;
    update(request: RequestWithAccount, id: string, updateAccountDto: UpdateAccountDto): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    }>;
}
