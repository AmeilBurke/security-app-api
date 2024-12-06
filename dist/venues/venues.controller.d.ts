import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(createVenueDto: CreateVenueDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVenueDto: UpdateVenueDto): string;
    remove(id: string): string;
}
