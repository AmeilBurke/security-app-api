import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/prisma.service';
import { Business } from '@prisma/client';
export declare class BusinessesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBusinessDto: CreateBusinessDto): Promise<Business | string>;
    findAll(uploaderEmail: string): Promise<Business[] | string>;
    findAllByIds(ids: number[]): Promise<Business[] | string>;
    findOne(id: number): Promise<Business | string>;
    update(id: number, updateBusinessDto: UpdateBusinessDto): Promise<Business | string>;
    remove(id: number, uploaderEmail: string): Promise<Business | string>;
}
