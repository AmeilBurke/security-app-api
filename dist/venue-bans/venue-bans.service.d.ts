import { CreateVenueBanDto } from './dto/create-venue-ban.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
export declare class VenueBansService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueBanDto: CreateVenueBanDto): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }>;
    findAll(request: RequestWithAccount): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }[]>;
    findOne(request: RequestWithAccount, id: number): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }>;
    remove(request: RequestWithAccount, id: number): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }>;
}
