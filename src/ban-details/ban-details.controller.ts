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

  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.banDetailsService.findAll(request);
  }

  @Get(':id')
  findOne(@Req() request: RequestWithAccount, @Param('id') accountId: string) {
    return this.banDetailsService.findBanDetailsByAccountId(
      request,
      Number(accountId),
    );
  }

  @Patch(':id')
  update(
    @Req() request: RequestWithAccount,
    @Param('id') id: string,
    @Body() updateBanDetailDto: UpdateIndividualBanDetailDto,
  ) {
    return this.banDetailsService.updateIndividualBanDetail(
      request,
      Number(id),
      updateBanDetailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banDetailsService.remove(+id);
  }
}
