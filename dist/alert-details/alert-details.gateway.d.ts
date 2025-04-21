import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { PrismaService } from 'src/prisma.service';
export declare class AlertDetailsGateway {
    private jwtService;
    private authenticationService;
    private prisma;
    constructor(jwtService: JwtService, authenticationService: AuthenticationService, prisma: PrismaService);
    server: Server;
    onModuleInit(): void;
    create(request: any, socket: Socket): Promise<void>;
}
