import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
export declare class BannedPeopleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createBannedPersonDto: CreateBannedPersonDto & {
        banDetails_reason: string;
        banDetails_banEndDate: string;
        banDetails_venueBanIds: string;
    }, file: Express.Multer.File): Promise<Prisma.BannedPersonGetPayload<{
        include: {
            BanDetail: true;
            AlertDetail: true;
        };
    }> | PrismaResultError>;
    findAllBlanketBanned(request: RequestWithAccount): Promise<Prisma.BannedPersonGetPayload<{
        include: {
            BanDetail: true;
        };
    }>[] | PrismaResultError>;
    findAllByVenueId(request: RequestWithAccount, venueId: number): Promise<Prisma.BannedPersonGetPayload<{
        include: {
            BanDetail: true;
        };
    }>[] | PrismaResultError>;
    findAllExpired(request: RequestWithAccount): Promise<Prisma.BannedPersonGetPayload<{
        include: {
            BanDetail: true;
        };
    }>[] | PrismaResultError>;
    findAllWithActiveAlert(request: RequestWithAccount): Promise<Prisma.BannedPersonGetPayload<{
        include: {
            AlertDetail: true;
            BanDetail: true;
        };
    }>[] | PrismaResultError>;
    findAllWithPendingBans(request: RequestWithAccount): Promise<Prisma.BannedPersonGetPayload<{
        include: {
            BanDetail: {
                include: {
                    Account: {
                        select: {
                            account_name: any;
                        };
                    };
                };
            };
        };
    }>[] | PrismaResultError>;
    findAllWithoutPendingBans(request: RequestWithAccount): Promise<any | PrismaResultError>;
    updateOneBannedPerson(request: RequestWithAccount, file: Express.Multer.File, bannedPersonId: number, updateBannedPersonDto: UpdateBannedPersonDto): Promise<{
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imagePath: string;
    } | PrismaResultError>;
}
