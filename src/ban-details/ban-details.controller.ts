import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
import { BanDecisionDto } from './dto/update-ban-decision-detail.dto';

@Controller('ban-details')
export class BanDetailsController {
  constructor(private readonly banDetailsService: BanDetailsService) {}

  @Post()
  create(@Body() createBanDetailDto: CreateBanDetailDto) {
    return this.banDetailsService.create(createBanDetailDto);
  }

  @Get()
  findAll() {
    return this.banDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banDetailsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBanDetailDto: UpdateBanDetailDto,
  ) {
    return this.banDetailsService.update(Number(id), updateBanDetailDto);
  }

  @Patch('/ban-decision/:id')
  updateIsBanDecision(
    @Param('id') id: string,
    @Body() banDecisionDto: BanDecisionDto,
  ) {
    return this.banDetailsService.updateIsBanPending(
      Number(id),
      banDecisionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banDetailsService.remove(Number(id));
  }
}
