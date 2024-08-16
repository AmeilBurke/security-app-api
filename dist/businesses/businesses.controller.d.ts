import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
export declare class BusinessesController {
    private readonly businessesService;
    constructor(businessesService: BusinessesService);
    create(createBusinessDto: CreateBusinessDto): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    findAll(uploaderEmail: {
        uploaderEmail: string;
    }): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }[]>;
    findAllByIds(ids: {
        ids: number[];
    }): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }[]>;
    findOneWithVenues(id: string): Promise<string | ({
        Venue: {
            venue_id: number;
            venue_name: string;
            venue_logo: string | null;
            business_id: number;
        }[];
    } & {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    })>;
    findOne(id: string): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    update(id: string, updateBusinessDto: UpdateBusinessDto): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    remove(id: string, uploaderEmail: {
        uploaderEmail: string;
    }): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
}
