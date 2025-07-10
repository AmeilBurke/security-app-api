import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class AlertDetailsGateway {
    private jwtService;
    constructor(jwtService: JwtService);
    server: Server;
    onModuleInit(): void;
    createAlert(message: {
        account_name: string;
    }): void;
}
