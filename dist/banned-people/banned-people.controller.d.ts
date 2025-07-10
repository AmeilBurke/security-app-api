import { BannedPeopleService } from './banned-people.service';
import { RequestWithAccount } from 'src/types';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
export declare class BannedPeopleController {
    private readonly bannedPeopleService;
    constructor(bannedPeopleService: BannedPeopleService);
    create(request: RequestWithAccount, createBannedPerson: CreateBannedPersonDto & {
        banDetails_reason: string;
        banDetails_banEndDate: string;
        banDetails_venueBanIds: string;
    }, file: Express.Multer.File): Promise<({
        BanDetail: {
            banDetail_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        }[];
        AlertDetail: {
            alertDetail_id: number;
            alertDetail_bannedPersonId: number | null;
            alertDetail_name: string;
            alertDetail_imagePath: string;
            alertDetail_alertReason: string;
            alertDetail_startTime: string;
            alertDetail_alertUploadedBy: number;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    }) | import("src/types").PrismaResultError>;
}
