import { Server, Socket } from 'socket.io';
export declare class BannedPeopleGateway {
    server: Server;
    onModuleInit(): void;
    create(accountName: {
        account_name: string;
    }, socket: Socket): void;
}
