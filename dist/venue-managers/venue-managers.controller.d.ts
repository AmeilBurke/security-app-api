import { VenueManagersService } from './venue-managers.service';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenueManagersController {
    private readonly venueManagersService;
    constructor(venueManagersService: VenueManagersService);
    create(request: RequestWithAccount, createVenueManagerDto: CreateVenueManagerDto): Promise<any>;
    findAll(request: RequestWithAccount): Promise<any>;
    update(request: RequestWithAccount, id: string, updateVenueManagerDto: UpdateVenueManagerDto): Promise<any>;
    remove(request: RequestWithAccount, id: string): Promise<any>;
}
