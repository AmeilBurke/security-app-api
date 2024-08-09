import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BanDetailsService } from './ban-details.service';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';

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
  update(@Param('id') id: string, @Body() updateBanDetailDto: UpdateBanDetailDto) {
    return this.banDetailsService.update(+id, updateBanDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banDetailsService.remove(+id);
  }
}
