import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
export declare class BannedPeopleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createBannedPersonWithBanDetailsDto: BannedPersonWithBanDetailsDto): Promise<"uploaderAccount is undefined" | ({
        BanLocation: {
            banLocation_id: number;
            banLocation_bannedPersonId: number;
            banLocation_venueId: number;
        }[];
        BanDetail: {
            banDetail_id: number;
            banDetail_reason: string;
            banDetail_startDate: string;
            banDetail_endDate: string;
            banDetail_isBanPending: boolean;
            banDetail_bannedPersonId: number | null;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    })>;
    findAll(): Promise<string>;
    findOne(id: number): string;
    update(id: number, updateBannedPersonDto: UpdateBannedPersonDto): string;
    remove(id: number): string;
}
