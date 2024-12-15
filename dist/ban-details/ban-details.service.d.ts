import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
export declare class BanDetailsService {
    create(createBanDetailDto: CreateBanDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBanDetailDto: UpdateBanDetailDto): string;
    remove(id: number): string;
}
