import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
export declare class VenueManagersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueManagerDto: CreateVenueManagerDto): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
    findAll(request: RequestWithAccount): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }[]>;
    findOne(request: RequestWithAccount, id: number): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
    update(request: RequestWithAccount, id: number, updateVenueManagerDto: UpdateVenueManagerDto): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
    remove(request: RequestWithAccount, id: number): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
}
