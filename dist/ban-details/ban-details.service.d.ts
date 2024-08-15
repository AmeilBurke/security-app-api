import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { BanDetail } from '@prisma/client';
export declare class BanDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBanDetailDto: CreateBanDetailDto): Promise<BanDetail | string>;
    findAll(): Promise<BanDetail[] | string>;
    findOne(id: number): Promise<BanDetail | string>;
    update(id: number, updateBanDetailDto: UpdateBanDetailDto): Promise<BanDetail | string>;
    updateIsBanPending(id: number, banDecisionDto: {
        banDecision: boolean;
        uploaderEmail: string;
    }): Promise<BanDetail | string>;
    remove(id: number): Promise<BanDetail | string>;
}
