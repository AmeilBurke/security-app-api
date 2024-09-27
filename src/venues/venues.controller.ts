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
        destination: 'src\\images\\business',
        filename: (req, file, cb) => {
          const fileType = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${fileType}`);
        },
      }),
    }),
  )
  create(
    @Req() req: RequestWithAccount,
    @UploadedFile() file: Express.Multer.File,
    @Body() createVenueDto: CreateVenueDto,
  ) {
    return this.venuesService.create(req, file, createVenueDto);
  }

  @Get('by-business-ids')
  findAllByBusinessIds(
    @Req() req: RequestWithAccount,
    @Body() businessIds: { businessIds: number[] },
  ) {
    return this.venuesService.findAllVenuesByBusinessIds(req, businessIds);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithAccount) {
    return this.venuesService.findOne(Number(id), req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: RequestWithAccount,
    @Body() updateVenueDto: UpdateVenueDto,
  ) {
    return this.venuesService.update(Number(id), req, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithAccount) {
    return this.venuesService.remove(Number(id), req);
  }
}
