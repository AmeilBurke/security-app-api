import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
export declare class AlertDetailsController {
    private readonly alertDetailsService;
    constructor(alertDetailsService: AlertDetailsService);
    create(createAlertDetailDto: CreateAlertDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAlertDetailDto: UpdateAlertDetailDto): string;
    remove(id: string): string;
}
