import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { Account } from '@prisma/client';
import { RequestWithAccount } from 'src/types';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<Account | string>;
    findAll(request: RequestWithAccount): Promise<Account[] | string>;
    findOne(request: RequestWithAccount, id: number): Promise<Account | string>;
    findOneByEmail(email: string): Promise<Account | string>;
    update(request: RequestWithAccount, id: number, updateAccountDto: UpdateAccountDto): Promise<Account | string>;
    remove(request: RequestWithAccount, id: number): Promise<Account | string>;
}
