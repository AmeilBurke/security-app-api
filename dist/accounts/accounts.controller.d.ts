import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { RequestWithAccount } from 'src/types';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<import("src/types").PrismaResultError | ({
        Role: {
            role_id: number;
            role_name: string;
        };
        VenueAccess: {
            venueAccess_id: number;
            venueAccess_accountId: number;
            venueAccess_venueId: number;
        }[];
        VenueManager: {
            venueManager_id: number;
            venueManager_venueId: number;
            venueManager_accountId: number;
        }[];
    } & {
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
        account_id: number;
    })>;
    createSecret(createAccountDto: CreateAccountDto): Promise<{
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
        account_id: number;
    }>;
    findAll(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        Role: {
            role_id: number;
            role_name: string;
        };
    } & {
        account_email: string;
        account_name: string;
        account_roleId: number;
        account_id: number;
    })[]>;
    findOne(request: RequestWithAccount, id: string): Promise<import("src/types").PrismaResultError | ({
        Role: {
            role_id: number;
            role_name: string;
        };
    } & {
        account_email: string;
        account_name: string;
        account_roleId: number;
        account_id: number;
    })>;
    update(request: RequestWithAccount, id: string, updateAccountDto: UpdateAccountDto): Promise<import("src/types").PrismaResultError | ({
        Role: {
            role_id: number;
            role_name: string;
        };
        VenueAccess: {
            venueAccess_id: number;
            venueAccess_accountId: number;
            venueAccess_venueId: number;
        }[];
        VenueManager: {
            venueManager_id: number;
            venueManager_venueId: number;
            venueManager_accountId: number;
        }[];
    } & {
        account_email: string;
        account_name: string;
        account_roleId: number;
        account_id: number;
    })>;
    remove(request: RequestWithAccount, id: string): Promise<import("src/types").PrismaResultError | {
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
        account_id: number;
    }>;
}
