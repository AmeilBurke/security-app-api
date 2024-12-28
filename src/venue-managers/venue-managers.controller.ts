import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueManagersService } from './venue-managers.service';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';

@Controller('venue-managers')
export class VenueManagersController {
  constructor(private readonly venueManagersService: VenueManagersService) {}

  @Post()
  create(@Body() createVenueManagerDto: CreateVenueManagerDto) {
    return this.venueManagersService.create(createVenueManagerDto);
  }

  @Get()
  findAll() {
    return this.venueManagersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueManagersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueManagerDto: UpdateVenueManagerDto) {
    return this.venueManagersService.update(+id, updateVenueManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueManagersService.remove(+id);
  }
}
