import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
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
}
