import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { AlertDetail, BanDetail, BannedPerson } from '@prisma/client';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { Server } from 'socket.io';
export declare class BannedPeopleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(payload: {
        sub: number;
        email: string;
        iat: number;
        exp: number;
    }, createBannedPersonDto: CreateBannedPersonDto & {
        fileData: string;
        banDetails: {
            banDetails_reason: string;
            banDetails_banEndDate: string;
            banDetails_venueBanIds: string;
        };
    }, imageName: string, server: Server): Promise<string | void>;
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
    update(request: RequestWithAccount, file: Express.Multer.File, id: number, updateBannedPersonDto: UpdateBannedPersonDto): Promise<string | BannedPerson>;
}
