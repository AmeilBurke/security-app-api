import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import { Venue } from '@prisma/client';
export declare class VenuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createVenueDto: CreateVenueDto): Promise<string | Venue>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVenueDto: UpdateVenueDto): string;
    remove(id: number): string;
}
