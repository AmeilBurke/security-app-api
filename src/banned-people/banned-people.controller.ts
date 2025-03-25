import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { RequestWithAccount } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import path from 'path';
import { isPrismaResultError } from 'src/utils';
import * as fs from 'fs';


@Controller('banned-people')
export class BannedPeopleController {
  constructor(private readonly bannedPeopleService: BannedPeopleService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
      storage: diskStorage({
        destination: path.join(
          __dirname,
          '..',
          '..',
          'src',
          'images',
          'people',
        ),
        filename: (req, file, cb) => {
          const fileType = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${fileType}`);
        },
      }),
    }),
  )
  async create(
    @Req()
    request: RequestWithAccount,
    @Body()
    createBannedPerson: CreateBannedPersonDto & {
      banDetails_reason: string;
      banDetails_banEndDate: string;
      banDetails_venueBanIds: string;
    },
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.bannedPeopleService.create(request, createBannedPerson, file);
  }

  // need to update to return file with details {details: bannedPerson; image: file}
  @Get('/blanket-banned')
  findAllBlanketBanned(@Req() request: RequestWithAccount) {
    return this.bannedPeopleService.findAllBlanketBanned(request);
  }

  @Get('/venue/:venueId')
  findAllByVenueId(
    @Req() request: RequestWithAccount,
    @Param('venueId') venueId: string,
  ) {
    return this.bannedPeopleService.findAllByVenueId(request, Number(venueId));
  }

  @Get('/expired')
  findAllExpired(@Req() request: RequestWithAccount) {
    return this.bannedPeopleService.findAllExpired(request);
  }

  @Get('/active-alert')
  findAllWithActiveAlert(@Req() request: RequestWithAccount) {
    return this.bannedPeopleService.findAllWithActiveAlert(request);
  }

  @Get('/pending')
  findAllWithPendingBans(@Req() request: RequestWithAccount) {
    return this.bannedPeopleService.findAllWithPendingBans(request);
  }
  // @Get('/photo/:id')
  // findOneWithPhoto(
  //   @Req() request: RequestWithAccount,
  //   @Res({ passthrough: true }) response: ExpressResponse,
  //   @Param('id') id: string,
  // ) {
  //   return this.bannedPeopleService.findOnePhoto(request, response, Number(id));
  // }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
      storage: diskStorage({
        destination: path.join(
          __dirname,
          '..',
          '..',
          'src',
          'images',
          'people',
        ),
        filename: (req, file, cb) => {
          const fileType = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${fileType}`);
        },
      }),
    }),
  )
  update(
    @Req() request: RequestWithAccount,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateBannedPersonDto: UpdateBannedPersonDto,
  ) {
    const result = this.bannedPeopleService.updateOneBannedPerson(
      request,
      file,
      Number(id),
      updateBannedPersonDto,
    );

        if (isPrismaResultError(result)) {
          fs.unlink(file.path, () => {
            console.log('banned-people controller: uploaded file has been deleted');
          });
        }
        return result;
  }
}
