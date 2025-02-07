import { AuthenticationService } from './authentication.service';
import { RequestWithAccount } from 'src/types';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    create(userLogin: {
        user_email: string;
        user_password: string;
    }): Promise<Buffer | string>;
    getProfile(request: RequestWithAccount): {
        sub: number;
        email: string;
        iat: number;
        exp: number;
    };
}
