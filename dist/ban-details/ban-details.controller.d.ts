import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
export declare class BanDetailsController {
    private readonly banDetailsService;
    constructor(banDetailsService: BanDetailsService);
    create(request: RequestWithAccount, createBanDetailDto: CreateBanDetailDto): Promise<import("src/types").PrismaResultError | import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>>;
    update(request: RequestWithAccount, banDetailId: string, updateBanDetailDto: UpdateIndividualBanDetailDto): Promise<import("src/types").PrismaResultError | {
        banDetail_id: number;
        banDetail_bannedPersonId: number;
        banDetail_reason: string;
        banDetail_banStartDate: string;
        banDetail_banEndDate: string;
        banDetail_isBanPending: boolean;
        banDetail_banUploadedBy: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<import("src/types").PrismaResultError | {
        banDetail_id: number;
        banDetail_bannedPersonId: number;
        banDetail_reason: string;
        banDetail_banStartDate: string;
        banDetail_banEndDate: string;
        banDetail_isBanPending: boolean;
        banDetail_banUploadedBy: number;
    }>;
}
