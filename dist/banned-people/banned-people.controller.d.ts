import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { RequestWithAccount } from 'src/types';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
export declare class BannedPeopleController {
    private readonly bannedPeopleService;
    constructor(bannedPeopleService: BannedPeopleService);
    create(request: RequestWithAccount, createBannedPerson: CreateBannedPersonDto & {
        banDetails_reason: string;
        banDetails_banEndDate: string;
        banDetails_venueBanIds: string;
    }, file: Express.Multer.File): Promise<import("src/types").PrismaResultError | ({
        AlertDetail: {
            alertDetail_id: number;
            alertDetail_bannedPersonId: number | null;
            alertDetail_name: string;
            alertDetail_imagePath: string;
            alertDetail_alertReason: string;
            alertDetail_startTime: string;
            alertDetail_alertUploadedBy: number;
        }[];
        BanDetail: {
            banDetails_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_venueBanId: number;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    })>;
    findAllBlanketBanned(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        BanDetail: {
            banDetails_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_venueBanId: number;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    })[]>;
    findAllByVenueId(request: RequestWithAccount, venueId: string): Promise<import("src/types").PrismaResultError | ({
        BanDetail: {
            banDetails_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_venueBanId: number;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    })[]>;
    findAllExpired(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        BanDetail: {
            banDetails_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_venueBanId: number;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    })[]>;
    findAllWithActiveAlert(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        AlertDetail: {
            alertDetail_id: number;
            alertDetail_bannedPersonId: number | null;
            alertDetail_name: string;
            alertDetail_imagePath: string;
            alertDetail_alertReason: string;
            alertDetail_startTime: string;
            alertDetail_alertUploadedBy: number;
        }[];
        BanDetail: {
            banDetails_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_venueBanId: number;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        }[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    })[]>;
    findAllWithPendingBans(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        BanDetail: ({
            Account: {
                account_name: string;
            };
        } & {
            banDetails_id: number;
            banDetail_bannedPersonId: number;
            banDetail_reason: string;
            banDetail_banStartDate: string;
            banDetail_banEndDate: string;
            banDetail_venueBanId: number;
            banDetail_isBanPending: boolean;
            banDetail_banUploadedBy: number;
        })[];
    } & {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    })[]>;
    findAllWithoutPendingBans(request: RequestWithAccount): Promise<any>;
    findAll(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    }[]>;
    update(request: RequestWithAccount, file: Express.Multer.File, id: string, updateBannedPersonDto: UpdateBannedPersonDto): Promise<import("src/types").PrismaResultError | {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    }>;
}
