import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { AlertDetail, Prisma } from '@prisma/client';
import { PrismaResultError, RequestWithAccount } from 'src/types';
export declare class AlertDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: RequestWithAccount, createAlertDetail: CreateAlertDetailDto, file: Express.Multer.File): Promise<AlertDetail | PrismaResultError>;
    findAll(request: RequestWithAccount): Promise<Prisma.AlertDetailGetPayload<{
        include: {
            Account: {
                select: {
                    account_name: true;
                };
            };
        };
    }>[] | PrismaResultError>;
    update(request: RequestWithAccount, updateAlertDetailDto: UpdateAlertDetailDto, alertDetailId: number, file: Express.Multer.File): Promise<PrismaResultError | {
        alertDetail_id: number;
        alertDetail_bannedPersonId: number | null;
        alertDetail_name: string;
        alertDetail_imagePath: string;
        alertDetail_alertReason: string;
        alertDetail_startTime: string;
        alertDetail_alertUploadedBy: number;
    }>;
    deleteAll(request: RequestWithAccount): Promise<Prisma.BatchPayload | PrismaResultError>;
    deleteOne(request: RequestWithAccount, alertDetailId: number): Promise<AlertDetail | PrismaResultError>;
    private cronDeleteAll;
}
