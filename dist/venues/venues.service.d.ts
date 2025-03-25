import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import { Venue, Prisma } from '@prisma/client';
import { PrismaResultError } from 'src/types';
export declare class VenuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<Venue | PrismaResultError>;
    findAllvenues(request: RequestWithAccount): Promise<Prisma.VenueGetPayload<{
        include: {
            VenueManager: true;
        };
    }>[] | PrismaResultError>;
    updateOneVenue(request: RequestWithAccount, file: Express.Multer.File, venueId: number, updateVenueDto: UpdateVenueDto): Promise<Venue | PrismaResultError>;
    deleteOneVenue(request: RequestWithAccount, venueId: number): Promise<Venue | PrismaResultError>;
}
