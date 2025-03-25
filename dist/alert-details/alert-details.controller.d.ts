import { AlertDetailsService } from './alert-details.service';
import { RequestWithAccount } from 'src/types';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
export declare class AlertDetailsController {
    private readonly alertDetailService;
    constructor(alertDetailService: AlertDetailsService);
    create(request: RequestWithAccount, createAlertDetailDto: CreateAlertDetailDto, file: Express.Multer.File): Promise<import("src/types").PrismaResultError | {
        alertDetail_id: number;
        alertDetail_bannedPersonId: number | null;
        alertDetail_name: string;
        alertDetail_imagePath: string;
        alertDetails_alertReason: string;
        alertDetails_startTime: string;
        alertDetails_alertUploadedBy: number;
    }>;
    findAll(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | ({
        Account: {
            account_name: string;
        };
    } & {
        alertDetail_id: number;
        alertDetail_bannedPersonId: number | null;
        alertDetail_name: string;
        alertDetail_imagePath: string;
        alertDetails_alertReason: string;
        alertDetails_startTime: string;
        alertDetails_alertUploadedBy: number;
    })[]>;
    update(request: RequestWithAccount, updateAlertDetailDto: UpdateAlertDetailDto, alertDetailId: string, file: Express.Multer.File): Promise<import("src/types").PrismaResultError | {
        alertDetail_id: number;
        alertDetail_bannedPersonId: number | null;
        alertDetail_name: string;
        alertDetail_imagePath: string;
        alertDetails_alertReason: string;
        alertDetails_startTime: string;
        alertDetails_alertUploadedBy: number;
    }>;
    deleteAll(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | import(".prisma/client").Prisma.BatchPayload>;
    deleteOne(request: RequestWithAccount, alertDetailId: string): Promise<import("src/types").PrismaResultError | {
        alertDetail_id: number;
        alertDetail_bannedPersonId: number | null;
        alertDetail_name: string;
        alertDetail_imagePath: string;
        alertDetails_alertReason: string;
        alertDetails_startTime: string;
        alertDetails_alertUploadedBy: number;
    }>;
}
