import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { BanDetail, Prisma } from '@prisma/client';
export declare class BanDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<Prisma.PrismaPromise<Prisma.BatchPayload> | PrismaResultError>;
    findBanDetailsByAccountId(request: RequestWithAccount, accountId: number): Promise<BanDetail | PrismaResultError>;
    updateIndividualBanDetail(request: RequestWithAccount, id: number, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<BanDetail | PrismaResultError>;
    remove(request: RequestWithAccount, id: number): Promise<BanDetail | PrismaResultError>;
}
