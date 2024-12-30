import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
export declare class VenueAccessService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueAccessDto: CreateVenueAccessDto): Promise<string | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
    findAll(request: RequestWithAccount): Promise<string | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }[]>;
    findOne(request: RequestWithAccount, id: number): Promise<string | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
    remove(request: RequestWithAccount, id: number): Promise<string | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
}
