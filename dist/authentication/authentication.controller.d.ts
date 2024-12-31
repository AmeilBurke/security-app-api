import { AuthenticationService } from './authentication.service';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    create(userLogin: {
        user_email: string;
        user_password: string;
    }): Promise<Buffer | string>;
    getProfile(request: any): any;
}
