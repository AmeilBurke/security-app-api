import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';

@Controller('alert-details')
export class AlertDetailsController {
  constructor(private readonly alertDetailsService: AlertDetailsService) {}

  @Post()
  create(@Body() createAlertDetailDto: CreateAlertDetailDto) {
    return this.alertDetailsService.create(createAlertDetailDto);
  }

  @Get()
  findAll(@Body() uploaderEmail: { uploaderEmail: string }) {
    return this.alertDetailsService.findAll(uploaderEmail.uploaderEmail);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertDetailsService.findOne(Number(id));
  }

  @Get('/business/:id')
  findAllByBusiness(@Param('id') id: string) {
    return this.alertDetailsService.findAllByBusiness(Number(id));
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAlertDetailDto: UpdateAlertDetailDto,
  // ) {
  //   return this.alertDetailsService.update(Number(id), updateAlertDetailDto);
  // }

  @Delete()
  removeAll() {
    return this.alertDetailsService.removeAll();
  }
}
