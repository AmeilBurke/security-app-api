import { BannedPersonsService } from './banned-persons.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPerson } from '@prisma/client';
import { CreateBannedPersonWithBanDetailsDto } from './dto/create-banned-person-with-ban-details.dto';
export declare class BannedPersonsController {
    private readonly bannedPersonsService;
    constructor(bannedPersonsService: BannedPersonsService);
    createBannedPersonWithBanDetails(file: Express.Multer.File, createBannedPersonWithBanDetailsDto: CreateBannedPersonWithBanDetailsDto): Promise<string | ({
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    } | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        banDetail_isBanPending: boolean;
        bannedPerson_id: number | null;
    })[]>;
    findAll(): Promise<BannedPerson[] | string>;
    findOne(id: string): Promise<BannedPerson | string>;
    update(id: string, updateBannedPersonDto: UpdateBannedPersonDto): Promise<BannedPerson | string>;
    remove(id: string, uploaderEmail: {
        uploaderEmail: string;
    }): Promise<BannedPerson | string>;
}
