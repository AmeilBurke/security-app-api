import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { BanDetail, Prisma } from '@prisma/client';
export declare class BanDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<string | Prisma.PrismaPromise<Prisma.BatchPayload>>;
    findAll(request: RequestWithAccount): Promise<string | {
        active_bans: BanDetail[];
        non_active_bans: BanDetail[] | null;
    }>;
    findBanDetailsByAccountId(request: RequestWithAccount, accountId: number): Promise<string | BanDetail>;
    updateIndividualBanDetail(request: RequestWithAccount, id: number, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<string | BanDetail>;
    remove(request: RequestWithAccount, id: number): Promise<string | BanDetail>;
}
