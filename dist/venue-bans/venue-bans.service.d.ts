import { CreateVenueBanDto } from './dto/create-venue-ban.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { VenueBan } from '@prisma/client';
export declare class VenueBansService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createVenueBanDto: CreateVenueBanDto): Promise<string | VenueBan>;
    findAll(request: RequestWithAccount): Promise<string | VenueBan[]>;
    findOne(request: RequestWithAccount, id: number): Promise<string | VenueBan>;
    remove(request: RequestWithAccount, id: number): Promise<string | VenueBan>;
}
