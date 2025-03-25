import { VenueAccessService } from './venue-access.service';
import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenueAccessController {
    private readonly venueAccessService;
    constructor(venueAccessService: VenueAccessService);
    create(request: RequestWithAccount, createVenueAccessDto: CreateVenueAccessDto): Promise<import("src/types").PrismaResultError | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
    remove(request: RequestWithAccount, venueAccessid: string): Promise<import("src/types").PrismaResultError | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
}
