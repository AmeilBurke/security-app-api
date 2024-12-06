import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { BannedPeopleService } from './banned-people.service';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
export declare class BannedPeopleGateway {
    private bannedPeopleService;
    private jwtService;
    constructor(bannedPeopleService: BannedPeopleService, jwtService: JwtService);
    server: Server;
    onModuleInit(): void;
    create(createBannedPerson: CreateBannedPersonDto & {
        fileData: string;
        banDetails: {
            banDetails_reason: string;
            banDetails_banEndDate: string;
            banDetails_venueBanIds: string;
        };
    }, client: Socket): Promise<string | void>;
}
