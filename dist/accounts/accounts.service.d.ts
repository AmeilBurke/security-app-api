import { Account, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { AccountWithRoleNoPassword, PrismaResultError, RequestWithAccount } from "src/types";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<Prisma.AccountGetPayload<{
        include: {
            role: true;
        };
    }> | PrismaResultError>;
    findOneByEmail(email: string): Promise<Prisma.AccountGetPayload<{
        include: {
            role: true;
        };
    }> | PrismaResultError>;
    createSecret(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(request: RequestWithAccount): Promise<AccountWithRoleNoPassword[] | PrismaResultError>;
    findOne(request: RequestWithAccount, id: number): Promise<AccountWithRoleNoPassword | PrismaResultError>;
    update(request: RequestWithAccount, id: number, updateAccountDto: UpdateAccountDto): Promise<AccountWithRoleNoPassword | PrismaResultError>;
    remove(request: RequestWithAccount, id: number): Promise<string | PrismaResultError>;
}
