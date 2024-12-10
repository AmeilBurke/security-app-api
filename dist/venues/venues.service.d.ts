import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import { Venue } from '@prisma/client';
export declare class VenuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<string | Venue>;
    findAllVenues(request: RequestWithAccount): Promise<string | Venue[]>;
    findAllBansForVenue(request: RequestWithAccount, id: number): Promise<string | {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imageName: string;
    }[]>;
    update(id: number, updateVenueDto: UpdateVenueDto): string;
    remove(id: number): string;
}
