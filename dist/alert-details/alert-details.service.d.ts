import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { AlertDetail } from '@prisma/client';
export declare class AlertDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAlertDetailDto: CreateAlertDetailDto): Promise<AlertDetail | string>;
    findAll(uploaderEmail: string): Promise<AlertDetail[] | string>;
    findAllByBusiness(id: number): Promise<AlertDetail[] | string>;
    findOne(id: number): Promise<AlertDetail | string>;
    removeAll(): Promise<{
        count: number;
    } | string>;
}
