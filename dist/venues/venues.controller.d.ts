import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVenueDto: UpdateVenueDto): string;
    remove(id: string): string;
}
