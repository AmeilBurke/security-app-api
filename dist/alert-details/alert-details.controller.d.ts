import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
export declare class AlertDetailsController {
    private readonly alertDetailsService;
    constructor(alertDetailsService: AlertDetailsService);
    create(createAlertDetailDto: CreateAlertDetailDto): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }>;
    findAll(uploaderEmail: {
        uploaderEmail: string;
    }): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }[]>;
    findOne(id: string): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }>;
    findAllByBusiness(id: string): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }[]>;
    removeAll(): Promise<string | {
        count: number;
    }>;
}
