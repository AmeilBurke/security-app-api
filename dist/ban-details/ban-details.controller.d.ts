import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
export declare class BanDetailsController {
    private readonly banDetailsService;
    constructor(banDetailsService: BanDetailsService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<import("src/types").PrismaResultError | import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>>;
    update(request: RequestWithAccount, banDetailId: string, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<import("src/types").PrismaResultError | {
        banDetails_id: number;
        banDetails_bannedPersonId: number;
        banDetails_reason: string;
        banDetails_banStartDate: string;
        banDetails_banEndDate: string;
        banDetails_venueBanId: number;
        banDetails_isBanPending: boolean;
        banDetails_banUploadedBy: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<import("src/types").PrismaResultError | {
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
