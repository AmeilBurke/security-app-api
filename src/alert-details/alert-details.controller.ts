import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';

@Controller('alert-details')
export class AlertDetailsController {
  constructor(private readonly alertDetailsService: AlertDetailsService) {}

  @Post()
  create(@Body() createAlertDetailDto: CreateAlertDetailDto) {
    return this.alertDetailsService.create(createAlertDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertDetailsService.remove(Number(id));
  }
}
