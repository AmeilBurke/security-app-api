import { PartialType } from '@nestjs/mapped-types';
import { CreateBanDetailDto } from './create-ban-detail.dto';

export class UpdateBanDetailDto extends PartialType(CreateBanDetailDto) {}
