import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
export declare class AlertDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAlertDetailDto: CreateAlertDetailDto): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }>;
    remove(id: number): Promise<{
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }>;
}
