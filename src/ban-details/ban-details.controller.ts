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
import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';

@Controller('ban-details')
export class BanDetailsController {
  constructor(private readonly banDetailsService: BanDetailsService) {}

  @Post()
  create(
    @Req() request: RequestWithAccount,
    @Body() createBanDetailDto: CreateBanDetailDto,
  ) {
    return this.banDetailsService.create(request, createBanDetailDto);
  }

  @Patch(':id')
  update(
    @Req() request: RequestWithAccount,
    @Param('id') banDetailId: string,
    @Body() updateBanDetailDto: UpdateIndividualBanDetailDto,
  ) {
    return this.banDetailsService.updateIndividualBanDetail(
      request,
      Number(banDetailId),
      updateBanDetailDto,
    );
  }

  @Delete(':id')
  remove(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.banDetailsService.remove(request, Number(id));
  }
}
