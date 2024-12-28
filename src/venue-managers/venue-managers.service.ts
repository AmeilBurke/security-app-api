import { Injectable } from '@nestjs/common';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';

@Injectable()
export class VenueManagersService {
  create(createVenueManagerDto: CreateVenueManagerDto) {
    return 'This action adds a new venueManager';
  }

  findAll() {
    return `This action returns all venueManagers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venueManager`;
  }

  update(id: number, updateVenueManagerDto: UpdateVenueManagerDto) {
    return `This action updates a #${id} venueManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} venueManager`;
  }
}
