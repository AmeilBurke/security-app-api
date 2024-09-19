import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
export declare class BusinessesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, file: Express.Multer.File, createBusinessDto: CreateBusinessDto): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    findAllByAccess(request: RequestWithAccount): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }[]>;
    update(id: number, request: RequestWithAccount, file: Express.Multer.File, updateBusinessDto: UpdateBusinessDto): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    remove(id: number, request: RequestWithAccount): Promise<string | [import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }]>;
}
