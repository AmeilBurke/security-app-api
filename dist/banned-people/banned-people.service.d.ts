import { StreamableFile } from '@nestjs/common';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import type { Response as ExpressResponse } from 'express';
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
    findOne(id: number, res: ExpressResponse): Promise<string | ({
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
    getAccountPicture(id: number, res: ExpressResponse): Promise<string | StreamableFile>;
    getBannedPeopleByEstablishment(id: number): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }[]>;
    update(id: number, file: Express.Multer.File, request: RequestWithAccount, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }>;
    remove(id: number): string | import(".prisma/client").Prisma.Prisma__BannedPersonClient<{
        bannedPerson_id: number;
        bannedPerson_image: string | null;
        bannedPerson_name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
