import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateAccountAccessDto } from './dto/update-account-access.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<string>;
    findAll(request: RequestWithAccount): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    }[]>;
    findOne(id: number, request: RequestWithAccount): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    }>;
    findOneToSignIn(email: string): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    }>;
    updateAccountDetails(id: number, request: RequestWithAccount, updateAccountDto: UpdateAccountDto): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    }>;
    updateAccountAccess(id: number, request: RequestWithAccount, updateAccountAccessDto: UpdateAccountAccessDto): Promise<string | ({
        BusinessAccess: {
            businessAccess_id: number;
            businessAccess_accountId: number;
            businessAccess_businessId: number;
        }[];
        VenueAccess: {
            accountVenueAccess: number;
            venueAccess_accountId: number;
            venueAccess_venueId: number;
        }[];
        VenueManager: {
            venueManagerId: number;
            venueManager_accountId: number;
            venueManager_venueId: number;
        }[];
        BusinessManager: {
            businessManagerId: number;
            businessManager_accountId: number;
            businessManager_businessId: number;
        }[];
    } & {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    })>;
    remove(id: number, request: RequestWithAccount): Promise<{
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    } | "uploaderAccount is undefined">;
}
