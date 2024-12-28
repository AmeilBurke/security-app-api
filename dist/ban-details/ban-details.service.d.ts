import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
export declare class BanDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<string | import(".prisma/client").Prisma.BatchPayload>;
    findAll(request: RequestWithAccount): Promise<string | {
        active_bans: {
            banDetails_id: number;
            banDetails_bannedPersonId: number;
            banDetails_reason: string;
            banDetails_banStartDate: string;
            banDetails_banEndDate: string;
            banDetails_venueBanId: number;
            banDetails_isBanPending: boolean;
            banDetails_banUploadedBy: number;
        }[];
        non_active_bans: {
            banDetails_id: number;
            banDetails_bannedPersonId: number;
            banDetails_reason: string;
            banDetails_banStartDate: string;
            banDetails_banEndDate: string;
            banDetails_venueBanId: number;
            banDetails_isBanPending: boolean;
            banDetails_banUploadedBy: number;
        }[];
    }>;
    findBanDetailsByAccountId(request: RequestWithAccount, accountId: number): Promise<string | {
        banDetails_id: number;
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
    }>;
    updateIndividualBanDetail(request: RequestWithAccount, id: number, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<string | {
        banDetails_id: number;
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
    }>;
    remove(request: RequestWithAccount, id: number): Promise<string | {
        banDetails_id: number;
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
    }>;
}
