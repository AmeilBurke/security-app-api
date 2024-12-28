import { VenueManagersService } from './venue-managers.service';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
export declare class VenueManagersController {
    private readonly venueManagersService;
    constructor(venueManagersService: VenueManagersService);
    create(createVenueManagerDto: CreateVenueManagerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVenueManagerDto: UpdateVenueManagerDto): string;
    remove(id: string): string;
}
