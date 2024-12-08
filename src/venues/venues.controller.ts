import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src\\images\\people',
        filename: (req, file, cb) => {
          const fileType = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${fileType}`);
        },
      }),
    }),
  )
  create(
    @Req() request: RequestWithAccount,
    @UploadedFile() file: Express.Multer.File,
    @Body() createVenueDto: CreateVenueDto,
  ) {
    return this.venuesService.create(request, file, createVenueDto);
  }

  @Get()
  findAll() {
    return this.venuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(+id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuesService.remove(+id);
  }
}
