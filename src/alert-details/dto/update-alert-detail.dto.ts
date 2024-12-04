import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDetailDto } from './create-alert-detail.dto';

export class UpdateAlertDetailDto extends PartialType(CreateAlertDetailDto) {
  id: number;
}
