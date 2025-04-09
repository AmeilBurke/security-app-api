import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { Account, Prisma } from '@prisma/client';
import { PrismaResultError, RequestWithAccount } from 'src/types';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<Prisma.AccountGetPayload<{
        include: {
            VenueAccess: true;
            VenueManager: true;
            Role: true;
        };
    }> | PrismaResultError>;
    createSecret(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(request: RequestWithAccount): Promise<Prisma.AccountGetPayload<{
        omit: {
            account_password: true;
        };
        include: {
            Role: true;
        };
    }>[] | PrismaResultError>;
    findOne(request: RequestWithAccount, id: number): Promise<Prisma.AccountGetPayload<{
        omit: {
            account_password: true;
        };
        include: {
            Role: true;
        };
    }> | PrismaResultError>;
    findOneByEmail(email: string): Promise<Prisma.AccountGetPayload<{
        include: {
            Role: true;
        };
    }> | PrismaResultError>;
    update(request: RequestWithAccount, id: number, updateAccountDto: UpdateAccountDto): Promise<Prisma.AccountGetPayload<{
        omit: {
            account_password: true;
        };
        include: {
            VenueAccess: true;
            VenueManager: true;
            Role: true;
        };
    }> | PrismaResultError>;
    remove(request: RequestWithAccount, id: number): Promise<Account | PrismaResultError>;
}
