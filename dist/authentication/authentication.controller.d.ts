import { AuthenticationService } from './authentication.service';
import { Request, Response } from 'express';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    create(userLogin: {
        user_email: string;
        user_password: string;
    }, response: Response): Promise<string | import("../types").PrismaResultError>;
    getProfile(request: Request & {
        account: {
            sub: number;
            email: string;
            iat: number;
            exp: number;
        };
    }): Promise<{
        sub: number;
        email: string;
        iat: number;
        exp: number;
    }>;
}
