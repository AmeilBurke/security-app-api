import { BannedPeopleService } from './banned-people.service';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
export declare class BannedPeopleController {
    private readonly bannedPeopleService;
    constructor(bannedPeopleService: BannedPeopleService);
    create(createBannedPersonDto: CreateBannedPersonDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBannedPersonDto: UpdateBannedPersonDto): string;
    remove(id: string): string;
}
