import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { VenueAccess } from '@prisma/client';
export declare class VenueAccessService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueAccessDto: CreateVenueAccessDto): Promise<VenueAccess | PrismaResultError>;
    remove(request: RequestWithAccount, id: number): Promise<VenueAccess | PrismaResultError>;
}
