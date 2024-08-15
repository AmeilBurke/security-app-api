import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateBannedPersonWithBanDetailsDto } from './dto/create-banned-person-with-ban-details.dto';
export declare class BannedPersonsService {
    private prisma;
    constructor(prisma: PrismaService);
    createBannedPersonWithBanDetails(createBannedPersonWithBanDetailsDto: CreateBannedPersonWithBanDetailsDto, file: Express.Multer.File): Promise<string | ({
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
    findAll(): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }[]>;
    findOne(id: number): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
    update(id: number, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
    remove(id: number, uploaderEmail: string): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
}
