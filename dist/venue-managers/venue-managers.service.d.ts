import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
export declare class VenueManagersService {
    create(createVenueManagerDto: CreateVenueManagerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVenueManagerDto: UpdateVenueManagerDto): string;
    remove(id: number): string;
}
