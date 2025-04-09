import { JwtService } from '@nestjs/jwt';
import { Account, Role } from '@prisma/client';
import { Response } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaService } from 'src/prisma.service';
import { PrismaResultError } from 'src/types';
export declare class AuthenticationService {
    private accountsService;
    private jwtService;
    private prisma;
    constructor(accountsService: AccountsService, jwtService: JwtService, prisma: PrismaService);
    signIn(email: string, password: string, response: Response): Promise<Omit<Account & {
        Role: Role;
    }, 'account_password'> | PrismaResultError>;
    getAccountDetails(accountId: number, response: Response): Promise<Omit<Account & {
        Role: Role;
    }, 'account_password'> | PrismaResultError>;
}
