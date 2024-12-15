import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
export declare class BanDetailsController {
    private readonly banDetailsService;
    constructor(banDetailsService: BanDetailsService);
    create(createBanDetailDto: CreateBanDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBanDetailDto: UpdateBanDetailDto): string;
    remove(id: string): string;
}
