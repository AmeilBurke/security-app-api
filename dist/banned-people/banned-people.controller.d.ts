import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import type { Response as ExpressResponse } from 'express';
import { BanDetail } from '@prisma/client';
export declare class BannedPeopleController {
    private readonly bannedPeopleService;
    constructor(bannedPeopleService: BannedPeopleService);
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
    createNewBan(id: string, request: RequestWithAccount, body: BanDetail): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        banDetail_isBanPending: boolean;
        banDetail_bannedPersonId: number | null;
    }>;
    getPhotoFromBannedPersons(id: string, res: ExpressResponse): Promise<string | import("@nestjs/common").StreamableFile>;
    getBannedPeopleByVenue(id: string): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }[]>;
    findOne(id: string, res: ExpressResponse): Promise<string | ({
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
    update(id: string, file: Express.Multer.File, request: RequestWithAccount, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
    remove(id: string): string | import(".prisma/client").Prisma.Prisma__BannedPersonClient<{
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
