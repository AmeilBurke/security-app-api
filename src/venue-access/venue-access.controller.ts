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
import { VenueAccessService } from './venue-access.service';
import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { UpdateVenueAccessDto } from './dto/update-venue-access.dto';
import { RequestWithAccount } from 'src/types';

@Controller('venue-access')
export class VenueAccessController {
  constructor(private readonly venueAccessService: VenueAccessService) {}

  @Post()
  create(
    @Req() request: RequestWithAccount,
    @Body() createVenueAccessDto: CreateVenueAccessDto,
  ) {
    return this.venueAccessService.create(request, createVenueAccessDto);
  }

  @Delete(':id')
  remove(@Req() request: RequestWithAccount, @Param('id') venueAccessid: string) {
    return this.venueAccessService.remove(request, Number(venueAccessid));
  }
}
