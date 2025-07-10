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
import * as path from 'path';
import * as fs from 'fs';
import { isPrismaResultError } from 'src/utils';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: path.join(__dirname, '..', '..', 'images', 'venues'),
  //       filename: (req, file, cb) => {
  //         const fileType = file.mimetype.split('/')[1];
  //         cb(null, `${uuidv4()}.${fileType}`);
  //       },
  //     }),
  //   }),
  // )
  // async create(
  //   @Req() request: RequestWithAccount,
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() createVenueDto: CreateVenueDto,
  // ) {
  //   const result = await this.venuesService.create(
  //     request,
  //     file,
  //     createVenueDto,
  //   );

  //   if (isPrismaResultError(result) && file) {
  //     try {
  //       await fs.promises.unlink(file.path);
  //     } catch (error) {
  //       console.log(`error removing file at: ${file.path}`);
  //     }
  //   }
  //   return result;
  // }

  // @Get()
  // findAllVenues(@Req() request: RequestWithAccount) {
  //   return this.venuesService.findAllvenues(request);
  // }

  // @Patch(':id')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: path.join(__dirname, '..', '..', 'images', 'venues'),
  //       filename: (req, file, cb) => {
  //         const fileType = file.mimetype.split('/')[1];
  //         cb(null, `${uuidv4()}.${fileType}`);
  //       },
  //     }),
  //   }),
  // )
  // async update(
  //   @Req() request: RequestWithAccount,
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id') venueId: string,
  //   @Body() updateVenueDto: UpdateVenueDto,
  // ) {
  //   const result = await this.venuesService.updateOneVenue(
  //     request,
  //     file,
  //     Number(venueId),
  //     updateVenueDto,
  //   );

  //   if (isPrismaResultError(result) && file) {
  //     try {
  //       await fs.promises.unlink(file.path);
  //     } catch (error) {
  //       console.log(`error removing file at: ${file.path}`);
  //     }
  //   }
  //   return result;
  // }

  // @Delete(':id')
  // remove(@Req() request: RequestWithAccount, @Param('id') venueId: string) {
  //   return this.venuesService.deleteOneVenue(request, Number(venueId));
  // }
}
