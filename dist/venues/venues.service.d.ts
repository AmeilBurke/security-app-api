import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma.service';
import { Venue } from '@prisma/client';
export declare class VenuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createVenueDto: CreateVenueDto): Promise<Venue | string>;
    businessOwnerCreateVenue(): Promise<void>;
    findAll(uploaderEmail: string): Promise<Venue[] | String>;
    allowedForAccount(id: number, uploaderEmail: string): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        business_id: number;
    }[]>;
    update(id: number, updateVenueDto: UpdateVenueDto): Promise<string | {
        venue_id: number;
        venue_name: string;
        venue_logo: string | null;
        business_id: number;
    }>;
    remove(id: number, uploaderEmail: string): Promise<void>;
}
