import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.alertDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDetailDto: UpdateAlertDetailDto) {
    return this.alertDetailsService.update(+id, updateAlertDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertDetailsService.remove(+id);
  }
}
