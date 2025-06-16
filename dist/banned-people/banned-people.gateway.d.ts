import { Server } from 'socket.io';
export declare class BannedPeopleGateway {
    server: Server;
    onModuleInit(): void;
    createBanForNewPerson(message: {
        account_name: string;
    }): void;
    createBanForExistingPerson(message: {
        account_name: string;
        bannedPerson_name: string;
    }): void;
}
