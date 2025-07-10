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
        destination: path.join(__dirname, '..', '..', 'images', 'people'),
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
    const result = await this.bannedPeopleService.create(
      request,
      createBannedPerson,
      file,
    );

    if (isPrismaResultError(result)) {
      try {
        fs.promises.unlink(file.path);
        console.log(`file ${file.path} removed`);
      } catch (error) {
        console.log(error);
      }
    }
    return result;
  }

  // @Get('/blanket-banned')
  // async findAllBlanketBanned(@Req() request: RequestWithAccount) {
  //   return await this.bannedPeopleService.findAllBlanketBanned(request);
  // }

  // @Get('/venue/:venueId')
  // async findAllByVenueId(
  //   @Req() request: RequestWithAccount,
  //   @Param('venueId') venueId: string,
  // ) {
  //   return await this.bannedPeopleService.findAllByVenueId(
  //     request,
  //     Number(venueId),
  //   );
  // }

  // @Get('/individual/:bannedPersonId')
  // async findOneById(
  //   @Req() request: RequestWithAccount,
  //   @Param('bannedPersonId') bannedPersonId: string,
  // ) {
  //   return await this.bannedPeopleService.findOneById(
  //     request,
  //     Number(bannedPersonId),
  //   );
  // }

  // @Get('/expired')
  // async findAllExpired(@Req() request: RequestWithAccount) {
  //   return await this.bannedPeopleService.findAllExpired(request);
  // }

  // @Get('/active-alert')
  // async findAllWithActiveAlert(@Req() request: RequestWithAccount) {
  //   return await this.bannedPeopleService.findAllWithActiveAlert(request);
  // }

  // @Get('/pending')
  // async findAllWithPendingBans(@Req() request: RequestWithAccount) {
  //   return await this.bannedPeopleService.findAllWithPendingBans(request);
  // }

  // @Get('/not-pending')
  // async findAllWithoutPendingBans(@Req() request: RequestWithAccount) {
  //   return await this.bannedPeopleService.findAllWithoutPendingBans(request);
  // }

  // @Get('/all')
  // async findAll(@Req() request: RequestWithAccount) {
  //   return await this.bannedPeopleService.findAll(request);
  // }

  // @Patch(':id')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     limits: {
  //       files: 1,
  //     },
  //     storage: diskStorage({
  //       destination: path.join(__dirname, '..', '..', 'images', 'people'),
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
  //   @Param('id') id: string,
  //   @Body() updateBannedPersonDto: UpdateBannedPersonDto,
  // ) {
  //   const result = await this.bannedPeopleService.updateOneBannedPerson(
  //     request,
  //     file,
  //     Number(id),
  //     updateBannedPersonDto,
  //   );

  //   if (isPrismaResultError(result) && file) {
  //     try {
  //       fs.promises.unlink(file.path);
  //     } catch (error) {
  //       console.log(`error removing file at: ${file.path}`);
  //     }
  //   }
  //   return result;
}
