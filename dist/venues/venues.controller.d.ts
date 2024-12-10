import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    }>;
    findAllVenues(request: RequestWithAccount): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_imagePath: string;
    }[]>;
    findOne(request: RequestWithAccount, id: string): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imageName: string;
    }[]>;
}
