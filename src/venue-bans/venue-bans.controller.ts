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
import { VenueBansService } from './venue-bans.service';
import { CreateVenueBanDto } from './dto/create-venue-ban.dto';
import { UpdateVenueBanDto } from './dto/update-venue-ban.dto';
import { RequestWithAccount } from 'src/types';

@Controller('venue-bans')
export class VenueBansController {
  constructor(private readonly venueBansService: VenueBansService) {}

  @Post()
  create(
    @Req() request: RequestWithAccount,
    @Body() createVenueBanDto: CreateVenueBanDto,
  ) {
    return this.venueBansService.create(request, createVenueBanDto);
  }

  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.venueBansService.findAll(request);
  }

  @Get(':id')
  findOne(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.venueBansService.findOne(request, Number(id));
  }

  @Delete(':id')
  remove(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.venueBansService.remove(request, Number(id));
  }
}
