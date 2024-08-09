import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
import { PrismaService } from 'src/prisma.service';
export declare class BanDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBanDetailDto: CreateBanDetailDto): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
    findAll(): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }[]>;
    findOne(id: number): Promise<{
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
    update(id: number, updateBanDetailDto: UpdateBanDetailDto): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
    remove(id: number): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
}
