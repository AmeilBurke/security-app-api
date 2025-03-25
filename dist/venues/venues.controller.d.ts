import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<{
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    } | import("src/types").PrismaResultError>;
    findAllVenues(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        VenueManager: {
            venueManager_id: number;
            venueManager_venueId: number;
            venueManager_accountId: number;
        }[];
    } & {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    })[]>;
    update(request: RequestWithAccount, file: Express.Multer.File, venueId: string, updateVenueDto: UpdateVenueDto): Promise<{
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    } | import("src/types").PrismaResultError>;
    remove(request: RequestWithAccount, venueId: string): Promise<{
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    } | import("src/types").PrismaResultError>;
}
