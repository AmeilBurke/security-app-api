import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
export declare class VenueManagersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueManagerDto: CreateVenueManagerDto): Promise<any>;
    findAll(request: RequestWithAccount): Promise<any>;
    findOne(request: RequestWithAccount, id: number): Promise<any>;
    update(request: RequestWithAccount, id: number, updateVenueManagerDto: UpdateVenueManagerDto): Promise<any>;
    remove(request: RequestWithAccount, id: number): Promise<any>;
}
