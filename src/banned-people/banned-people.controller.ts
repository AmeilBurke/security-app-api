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
  Res,
} from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import type { Response as ExpressResponse } from 'express';

@Controller('banned-people')
export class BannedPeopleController {
  constructor(private readonly bannedPeopleService: BannedPeopleService) {}

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
    @Body() createBannedPersonWithBanDetailsDto: BannedPersonWithBanDetailsDto,
  ) {
    return this.bannedPeopleService.create(
      request,
      file,
      createBannedPersonWithBanDetailsDto,
    );
  }

  @Get('image/:id')
  getPhotoFromBannedPersons(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.bannedPeopleService.getAccountPicture(Number(id), res);
  }

  @Get('by-venue/:id')
  getBannedPeopleByVenue(@Param('id') id: string) {
    return this.bannedPeopleService.getBannedPeopleByEstablishment(Number(id));
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.bannedPeopleService.findOne(Number(id), res);
  }

  @Patch(':id')
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
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: RequestWithAccount,
    @Body() updateBannedPersonDto: UpdateBannedPersonDto,
  ) {
    return this.bannedPeopleService.update(
      Number(id),
      file,
      request,
      updateBannedPersonDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannedPeopleService.remove(Number(id));
  }
}
