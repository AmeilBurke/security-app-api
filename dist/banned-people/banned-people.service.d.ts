import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
export declare class BannedPeopleService {
    create(createBannedPersonDto: CreateBannedPersonDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBannedPersonDto: UpdateBannedPersonDto): string;
    remove(id: number): string;
}
