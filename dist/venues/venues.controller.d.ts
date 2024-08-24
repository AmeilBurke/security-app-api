import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(createVenueDto: CreateVenueDto): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        business_id: number;
    }>;
    findAll(uploaderEmail: {
        uploaderEmail: string;
    }): Promise<String | {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        business_id: number;
    }[]>;
    findAllowedVenues(id: string, uploaderEmail: {
        uploaderEmail: string;
    }): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        business_id: number;
    }[]>;
    update(id: string, updateVenueDto: UpdateVenueDto): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        business_id: number;
    }>;
    remove(id: string, uploaderEmail: {
        uploaderEmail: string;
    }): Promise<void>;
}
