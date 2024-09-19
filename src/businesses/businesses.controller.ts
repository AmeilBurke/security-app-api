import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithAccount } from 'src/types';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

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
    @Req() request: RequestWithAccount,
    @UploadedFile() file: Express.Multer.File,
    @Body() createBusinessDto: CreateBusinessDto,
  ) {
    return this.businessesService.create(request, file, createBusinessDto);
  }

  @Get()
  findAll(@Req() request: RequestWithAccount) {
    return this.businessesService.findAllByAccess(request);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: RequestWithAccount,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessesService.update(
      Number(id),
      request,
      file,
      updateBusinessDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithAccount) {
    return this.businessesService.remove(Number(id), request);
  }
}
