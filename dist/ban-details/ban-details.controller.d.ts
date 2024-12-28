import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
export declare class BanDetailsController {
    private readonly banDetailsService;
    constructor(banDetailsService: BanDetailsService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<string | import(".prisma/client").Prisma.BatchPayload>;
    findAll(request: RequestWithAccount): Promise<string | {
        active_bans: {
            banDetails_bannedPersonId: number;
            banDetails_reason: string;
            banDetails_banStartDate: string;
            banDetails_banEndDate: string;
            banDetails_venueBanId: number;
            banDetails_isBanPending: boolean;
            banDetails_banUploadedBy: number;
            banDetails_id: number;
        }[];
        non_active_bans: {
            banDetails_bannedPersonId: number;
            banDetails_reason: string;
            banDetails_banStartDate: string;
            banDetails_banEndDate: string;
            banDetails_venueBanId: number;
            banDetails_isBanPending: boolean;
            banDetails_banUploadedBy: number;
            banDetails_id: number;
        }[];
    }>;
    findOne(request: RequestWithAccount, accountId: string): Promise<string | {
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
        banDetails_id: number;
    }>;
    update(request: RequestWithAccount, id: string, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<string | {
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
        banDetails_id: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<string | {
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
        banDetails_id: number;
    }>;
}
