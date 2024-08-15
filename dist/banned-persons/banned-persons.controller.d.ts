import { BannedPersonsService } from './banned-persons.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { CreateBannedPersonWithBanDetailsDto } from './dto/create-banned-person-with-ban-details.dto';
export declare class BannedPersonsController {
    private readonly bannedPersonsService;
    constructor(bannedPersonsService: BannedPersonsService);
    createBannedPersonWithBanDetails(file: Express.Multer.File, createBannedPersonWithBanDetailsDto: CreateBannedPersonWithBanDetailsDto): Promise<string | [{
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }, {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        banDetail_isBanPending: boolean;
        bannedPerson_id: number | null;
    }]>;
    findAll(): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }[]>;
    findOne(id: string): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
    findOneWithBanDetails(id: string): Promise<string | ({
        BanDetail: {
            banDetail_id: number;
            banDetail_reason: string;
            banDetail_startDate: string;
            banDetail_endDate: string;
            banDetail_isBanPending: boolean;
            bannedPerson_id: number | null;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    })>;
    update(id: string, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
    remove(id: string, uploaderEmail: {
        uploaderEmail: string;
    }): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
}
