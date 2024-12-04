import { StreamableFile } from '@nestjs/common';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithSomeBanDetails, RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { AlertDetail, BanDetail, BannedPerson } from '@prisma/client';
import type { Response as ExpressResponse } from 'express';
export declare class BannedPeopleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createBannedPersonDto: BannedPersonWithSomeBanDetails): Promise<string | (BannedPerson & {
        BanDetail: BanDetail[];
        AlertDetail: AlertDetail[];
    })>;
    findAll(request: RequestWithAccount): Promise<string | {
        active_bans: (BannedPerson & {
            BanDetail: BanDetail[];
        })[];
        non_active_bans: (BannedPerson & {
            BanDetail: BanDetail[];
        })[];
    }>;
    findOneInfo(request: RequestWithAccount, id: number): Promise<string | (BannedPerson & {
        BanDetail: BanDetail[];
        AlertDetail: AlertDetail[];
    })>;
    findOnePhoto(request: RequestWithAccount, response: ExpressResponse, id: number): Promise<string | StreamableFile>;
    update(request: RequestWithAccount, file: Express.Multer.File, id: number, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | BannedPerson>;
}
