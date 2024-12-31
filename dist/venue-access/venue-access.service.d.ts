import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { VenueAccess } from '@prisma/client';
export declare class VenueAccessService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueAccessDto: CreateVenueAccessDto): Promise<string | VenueAccess>;
    findAll(request: RequestWithAccount): Promise<string | VenueAccess[]>;
    findOne(request: RequestWithAccount, id: number): Promise<string | VenueAccess>;
    remove(request: RequestWithAccount, id: number): Promise<string | VenueAccess>;
}
