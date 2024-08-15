import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateBannedPersonWithBanDetailsDto } from './dto/create-banned-person-with-ban-details.dto';
import { BanDetail, BannedPerson } from '@prisma/client';
import { TypeBannedPersonWithBanDetails } from 'src/types/types';
export declare class BannedPersonsService {
    private prisma;
    constructor(prisma: PrismaService);
    createBannedPersonWithBanDetails(createBannedPersonWithBanDetailsDto: CreateBannedPersonWithBanDetailsDto, file: Express.Multer.File): Promise<[BannedPerson, BanDetail] | string>;
    findAll(): Promise<BannedPerson[] | string>;
    findOne(id: number): Promise<BannedPerson | string>;
    findOneWithBanDetails(id: number): Promise<TypeBannedPersonWithBanDetails | string>;
    update(id: number, updateBannedPersonDto: UpdateBannedPersonDto): Promise<BannedPerson | string>;
    remove(id: number, uploaderEmail: string): Promise<BannedPerson | string>;
}
