import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { RequestWithAccount } from 'src/types';
export declare class BannedPeopleController {
    private readonly bannedPeopleService;
    constructor(bannedPeopleService: BannedPeopleService);
    findAll(request: RequestWithAccount): Promise<string | {
        active_bans: (import(".prisma/client").BannedPerson & {
            BanDetail: import(".prisma/client").BanDetail[];
        })[];
        non_active_bans: (import(".prisma/client").BannedPerson & {
            BanDetail: import(".prisma/client").BanDetail[];
        })[];
    }>;
    findOneInfo(request: RequestWithAccount, id: string): Promise<string | ({
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imageName: string;
    } & {
        BanDetail: import(".prisma/client").BanDetail[];
        AlertDetail: import(".prisma/client").AlertDetail[];
    })>;
    update(request: RequestWithAccount, file: Express.Multer.File, id: string, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imageName: string;
    }>;
}
