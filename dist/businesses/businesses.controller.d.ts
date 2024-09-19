import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { RequestWithAccount } from 'src/types';
export declare class BusinessesController {
    private readonly businessesService;
    constructor(businessesService: BusinessesService);
    create(request: RequestWithAccount, file: Express.Multer.File, createBusinessDto: CreateBusinessDto): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    findAll(request: RequestWithAccount): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }[]>;
    update(id: string, request: RequestWithAccount, file: Express.Multer.File, updateBusinessDto: UpdateBusinessDto): Promise<string | {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }>;
    remove(id: string, request: RequestWithAccount): Promise<string | [import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, {
        business_id: number;
        business_name: string;
        business_logo: string | null;
    }]>;
}
