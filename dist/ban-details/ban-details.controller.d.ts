import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
export declare class BanDetailsController {
    private readonly banDetailsService;
    constructor(banDetailsService: BanDetailsService);
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
    findOne(id: string): Promise<{
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
    update(id: string, updateBanDetailDto: UpdateBanDetailDto): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
    remove(id: string): Promise<string | {
        banDetail_id: number;
        banDetail_reason: string;
        banDetail_startDate: string;
        banDetail_endDate: string;
        bannedPerson_id: number | null;
    }>;
}
