import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { RequestWithAccount } from 'src/types';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
@Controller('alert-details')
export class AlertDetailsController {
  constructor(private readonly alertDetailService: AlertDetailsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
      storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'images', 'alerts'),
        filename: (req, file, cb) => {
          const fileType = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${fileType}`);
        },
      }),
    }),
  )
  async create(
    @Req() request: RequestWithAccount,
    @Body() createAlertDetailDto: CreateAlertDetailDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.alertDetailService.create(
      request,
      createAlertDetailDto,
      file,
    );
  }

  @Get()
  async findAll(@Req() request: RequestWithAccount) {
    return await this.alertDetailService.findAll(request);
  }

  @Patch(':alertDetailId')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
      storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'images', 'alerts'),
        filename: (req, file, cb) => {
          const fileType = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${fileType}`);
        },
      }),
    }),
  )
  async update(
    @Req() request: RequestWithAccount,
    @Body() updateAlertDetailDto: UpdateAlertDetailDto,
    @Param('alertDetailId') alertDetailId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.alertDetailService.update(
      request,
      updateAlertDetailDto,
      Number(alertDetailId),
      file,
    );
  }

  @Delete()
  async deleteAll(@Req() request: RequestWithAccount) {
    return await this.alertDetailService.deleteAll(request);
  }

  @Delete(':alertDetailId')
  async deleteOne(
    @Req() request: RequestWithAccount,
    @Param('alertDetailId') alertDetailId: string,
  ) {
    return await this.alertDetailService.deleteOne(
      request,
      Number(alertDetailId),
    );
  }
}
