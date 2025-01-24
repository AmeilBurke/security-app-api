import { Controller, Get, Req } from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { RequestWithAccount } from 'src/types';

@Controller('alert-details')
export class AlertDetailsController {
  constructor(private readonly alertDetailService: AlertDetailsService) {}

  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.alertDetailService.findAll(request);
  }
}
