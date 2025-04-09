import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';
export declare class AlertDetailsGateway {
    private jwtService;
    private authenticationService;
    constructor(jwtService: JwtService, authenticationService: AuthenticationService);
    server: Server;
    onModuleInit(): void;
    create(accountName: {
        account_name: string;
    }, socket: Socket): void;
}
