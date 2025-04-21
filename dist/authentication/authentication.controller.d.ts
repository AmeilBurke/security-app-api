import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import { RequestWithAccount } from 'src/types';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    create(userLogin: {
        user_email: string;
        user_password: string;
    }, response: Response): Promise<import("src/types").PrismaResultError | Omit<{
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    } & {
        Role: import(".prisma/client").Role;
    }, "account_password">>;
    getProfile(request: RequestWithAccount, response: Response): Promise<import("src/types").PrismaResultError | Omit<{
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_roleId: number;
    } & {
        Role: import(".prisma/client").Role;
    }, "account_password">>;
    signOut(response: Response): string;
}
