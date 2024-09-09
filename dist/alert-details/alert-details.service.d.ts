import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
export declare class AlertDetailsService {
    create(createAlertDetailDto: CreateAlertDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAlertDetailDto: UpdateAlertDetailDto): string;
    remove(id: number): string;
}
