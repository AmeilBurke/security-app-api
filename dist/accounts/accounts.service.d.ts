import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    }>;
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
    update(id: number, request: RequestWithAccount, updateAccountDto: UpdateAccountDto): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    }>;
    remove(id: number, request: RequestWithAccount): Promise<{
        account_id: number;
        account_email: string;
        account_name: string;
        account_password: string;
        account_roleId: number;
    } | "uploaderAccount is undefined">;
}
