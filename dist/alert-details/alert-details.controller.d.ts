import { AlertDetailsService } from './alert-details.service';
import { RequestWithAccount } from 'src/types';
export declare class AlertDetailsController {
    private readonly alertDetailService;
    constructor(alertDetailService: AlertDetailsService);
    findAll(request: RequestWithAccount): Promise<string | {
        alertDetail_id: number;
        alertDetail_bannedPersonId: number | null;
        alertDetail_name: string;
        alertDetail_imageName: string;
        alertDetails_alertReason: string;
        alertDetails_startTime: string;
        alertDetails_alertUploadedBy: number;
    }[]>;
}
