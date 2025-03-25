import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaResultError } from 'src/types';
export declare class AuthenticationService {
    private accountsService;
    private jwtService;
    constructor(accountsService: AccountsService, jwtService: JwtService);
    signIn(email: string, password: string, response: Response): Promise<string | PrismaResultError>;
}
