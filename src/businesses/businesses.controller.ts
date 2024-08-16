import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessesService.create(createBusinessDto);
  }

  @Get()
  findAll(@Body() uploaderEmail: { uploaderEmail: string }) {
    return this.businessesService.findAll(uploaderEmail.uploaderEmail);
  }

  @Get('/by-ids')
  findAllByIds(@Body() ids: { ids: number[] }) {
    return this.businessesService.findAllByIds(ids.ids);
  }

  @Get('/with-venues/:id')
  findOneWithVenues(@Param('id') id: string) {
    return this.businessesService.findOneWithVenues(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessesService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() uploaderEmail: { uploaderEmail: string },
  ) {
    return this.businessesService.remove(
      Number(id),
      uploaderEmail.uploaderEmail,
    );
  }
}