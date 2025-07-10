import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";
import { AccountsService } from "src/accounts/accounts.service";
import { PrismaService } from "src/prisma.service";
import type { AccountWithRoleNoPassword, PrismaResultError } from "src/types";
export declare class AuthenticationService {
    private accountsService;
    private jwtService;
    private prisma;
    constructor(accountsService: AccountsService, jwtService: JwtService, prisma: PrismaService);
    signIn(email: string, password: string, response: Response): Promise<AccountWithRoleNoPassword | PrismaResultError>;
    getAccountDetails(accountId: number, response: Response): Promise<AccountWithRoleNoPassword | PrismaResultError>;
}
