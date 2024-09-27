import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
export declare class VenuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<string | ({
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
    findAllVenuesByBusinessIds(req: RequestWithAccount, businessIds: {
        businessIds: number[];
    }): Promise<string>;
    findOne(id: number, request: RequestWithAccount): Promise<string>;
    update(id: number, request: RequestWithAccount, updateVenueDto: UpdateVenueDto): Promise<string>;
    remove(id: number, request: RequestWithAccount): Promise<string>;
}
