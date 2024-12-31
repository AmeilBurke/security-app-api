import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
export declare class BanDetailsController {
    private readonly banDetailsService;
    constructor(banDetailsService: BanDetailsService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<string | import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>>;
    findAll(request: RequestWithAccount): Promise<string | {
        active_bans: import(".prisma/client").BanDetail[];
        non_active_bans: import(".prisma/client").BanDetail[] | null;
    }>;
    findOne(request: RequestWithAccount, accountId: string): Promise<string | {
        banDetails_id: number;
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
    }>;
    update(request: RequestWithAccount, id: string, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<string | {
        banDetails_id: number;
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<string | {
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
