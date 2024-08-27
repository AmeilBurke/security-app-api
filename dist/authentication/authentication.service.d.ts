import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
export declare class AuthenticationService {
    private accountsService;
    private jwtService;
    constructor(accountsService: AccountsService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<"there was an error signing in, check your email & try again" | {
        access_token: string;
    }>;
}
