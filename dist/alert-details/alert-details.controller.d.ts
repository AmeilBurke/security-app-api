import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { RequestWithAccount } from 'src/types';
export declare class AlertDetailsController {
    private readonly alertDetailsService;
    constructor(alertDetailsService: AlertDetailsService);
    create(createAlertDetailDto: CreateAlertDetailDto): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }>;
    remove(id: string, request: RequestWithAccount): Promise<string | {
        alertDetails_id: number;
        alertDetails_bannedPersonId: number;
        alertDetails_businessId: number;
    }>;
}
