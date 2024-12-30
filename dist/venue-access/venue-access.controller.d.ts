import { VenueAccessService } from './venue-access.service';
import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenueAccessController {
    private readonly venueAccessService;
    constructor(venueAccessService: VenueAccessService);
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
    findOne(request: RequestWithAccount, id: string): Promise<string | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<string | {
        venueAccess_id: number;
        venueAccess_accountId: number;
        venueAccess_venueId: number;
    }>;
}
