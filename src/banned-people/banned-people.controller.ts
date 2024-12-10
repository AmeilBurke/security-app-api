import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithSomeBanDetails, RequestWithAccount } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import type { Response as ExpressResponse } from 'express';

@Controller('banned-people')
export class BannedPeopleController {
  constructor(private readonly bannedPeopleService: BannedPeopleService) {}

  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.bannedPeopleService.findAll(request);
  }

  @Get(':id')
  findOneInfo(@Req() request: RequestWithAccount, @Param('id') id: string) {
    return this.bannedPeopleService.findOneInfo(request, Number(id));
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
    @Req() request: RequestWithAccount,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateBannedPersonDto: UpdateBannedPersonDto,
  ) {
    return this.bannedPeopleService.update(request, file, Number(id), updateBannedPersonDto);
  }
}
