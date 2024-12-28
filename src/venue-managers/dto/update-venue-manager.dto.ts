import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueManagerDto } from './create-venue-manager.dto';

export class UpdateVenueManagerDto extends PartialType(CreateVenueManagerDto) {}
