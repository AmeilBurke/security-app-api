import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import { VenueManager } from '@prisma/client';
export declare class VenueManagersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueManagerDto: CreateVenueManagerDto): Promise<string | VenueManager>;
    findAll(request: RequestWithAccount): Promise<string | VenueManager[]>;
    findOne(request: RequestWithAccount, id: number): Promise<string | VenueManager>;
    findOneByVenueID(request: RequestWithAccount, venueId: number): Promise<string | {
        account_id: number;
        account_email: string;
        account_name: string;
    }[]>;
    update(request: RequestWithAccount, id: number, updateVenueManagerDto: UpdateVenueManagerDto): Promise<string | VenueManager>;
    remove(request: RequestWithAccount, id: number): Promise<string | VenueManager>;
}
