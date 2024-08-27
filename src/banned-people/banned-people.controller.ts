import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';

@Controller('banned-people')
export class BannedPeopleController {
  constructor(private readonly bannedPeopleService: BannedPeopleService) {}

  @Post()
  create(@Body() createBannedPersonDto: CreateBannedPersonDto) {
    return this.bannedPeopleService.create(createBannedPersonDto);
  }

  @Get()
  findAll() {
    return this.bannedPeopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannedPeopleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannedPersonDto: UpdateBannedPersonDto) {
    return this.bannedPeopleService.update(+id, updateBannedPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannedPeopleService.remove(+id);
  }
}
