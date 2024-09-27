import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(req: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<string | ({
        VenueManager: {
            venueManagerId: number;
            venueManager_accountId: number;
            venueManager_venueId: number;
        }[];
    } & {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        venue_businessId: number;
    })>;
    findAllByBusinessIds(req: RequestWithAccount, businessIds: {
        businessIds: number[];
    }): Promise<string>;
    findOne(id: string, req: RequestWithAccount): Promise<string>;
    update(id: string, req: RequestWithAccount, updateVenueDto: UpdateVenueDto): Promise<string>;
    remove(id: string, req: RequestWithAccount): Promise<string>;
}
