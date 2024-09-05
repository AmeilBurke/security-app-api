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
import { BannedPeopleService } from './banned-people.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

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
    console.log(createBannedPersonWithBanDetailsDto);
    return this.bannedPeopleService.create(
      request,
      file,
      createBannedPersonWithBanDetailsDto,
    );
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
  update(
    @Param('id') id: string,
    @Body() updateBannedPersonDto: UpdateBannedPersonDto,
  ) {
    return this.bannedPeopleService.update(+id, updateBannedPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannedPeopleService.remove(+id);
  }
}
