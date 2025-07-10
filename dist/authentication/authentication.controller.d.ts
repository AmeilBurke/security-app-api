import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import { RequestWithAccount } from 'src/types';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    create(userLogin: {
        user_email: string;
        user_password: string;
    }, response: Response): Promise<import("src/types").PrismaResultError | import("src/types").AccountWithRoleNoPassword>;
    getProfile(request: RequestWithAccount, response: Response): Promise<import("src/types").PrismaResultError | import("src/types").AccountWithRoleNoPassword>;
    signOut(response: Response): string;
}
