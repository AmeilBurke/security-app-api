import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { VenueManagersService } from './venue-managers.service';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { RequestWithAccount } from 'src/types';

@Controller('venue-managers')
export class VenueManagersController {
  constructor(private readonly venueManagersService: VenueManagersService) {}

  @Post()
  create(
    @Req() request: RequestWithAccount,
    @Body() createVenueManagerDto: CreateVenueManagerDto,
  ) {
    return this.venueManagersService.create(request, createVenueManagerDto);
  }

  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.venueManagersService.findAll(request);
  }

  @Get(':id')
  findOne(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.venueManagersService.findOne(request, Number(id));
  }

  @Get('/venue/:id')
  findOneByVenueID(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.venueManagersService.findOneByVenueID(request, Number(id));
  }


  @Patch(':id')
  update(
    @Req() request: RequestWithAccount,
    @Param('id') id: string,
    @Body() updateVenueManagerDto: UpdateVenueManagerDto,
  ) {
    return this.venueManagersService.update(
      request,
      Number(id),
      updateVenueManagerDto,
    );
  }

  @Delete(':id')
  remove(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.venueManagersService.remove(request, Number(id));
  }
}
