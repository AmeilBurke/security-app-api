import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<import("src/types").PrismaResultError | {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    }>;
    findAllVenues(request: RequestWithAccount): Promise<any>;
    update(request: RequestWithAccount, file: Express.Multer.File, venueId: string, updateVenueDto: UpdateVenueDto): Promise<import("src/types").PrismaResultError | {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    }>;
    remove(request: RequestWithAccount, venueId: string): Promise<import("src/types").PrismaResultError | {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    }>;
}
