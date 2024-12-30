import { VenueManagersService } from './venue-managers.service';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenueManagersController {
    private readonly venueManagersService;
    constructor(venueManagersService: VenueManagersService);
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
    findOne(request: RequestWithAccount, id: string): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
    update(request: RequestWithAccount, id: string, updateVenueManagerDto: UpdateVenueManagerDto): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<string | {
        venueManager_id: number;
        venueManager_venueId: number;
        venueManager_accountId: number;
    }>;
}
