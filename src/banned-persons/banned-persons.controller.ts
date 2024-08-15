import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { BannedPersonsService } from './banned-persons.service';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPerson } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateBannedPersonWithBanDetailsDto } from './dto/create-banned-person-with-ban-details.dto';

@Controller('banned-persons')
export class BannedPersonsController {
  constructor(private readonly bannedPersonsService: BannedPersonsService) {}

  // add ability to create bannedAccounts without ban details

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src\\images\\bannedPersons',
      }),
    }),
  )
  createBannedPersonWithBanDetails(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannedPersonWithBanDetailsDto: CreateBannedPersonWithBanDetailsDto,
    // ): Promise<BannedPerson | string> {
  ) {
    // need to re check this if its working when frontend can display images
    // console.log(file);
    // const file1 = createReadStream('src/images/bannedPersons/1ebb2b5fb64b5869d3325c9341fd6f20');
    // return new StreamableFile(file1);
    return this.bannedPersonsService.createBannedPersonWithBanDetails(createBannedPersonWithBanDetailsDto, file);
  }

  // come back to this when others are done
  // @Get('1')
  // getPhoto(@Res({ passthrough: true }) res: Response): StreamableFile {

  //   const file = createReadStream('src\\images\\bannedPersons\\1ebb2b5fb64b5869d3325c9341fd6f20');
  //   return new StreamableFile(file, {type: 'image'});
  // }

  // @Post('image')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: 'src\\images\\bannedPersons',
  //       filename:
  //     }),
  //   }),
  // )
  // uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  @Get()
  findAll(): Promise<BannedPerson[] | string> {
    return this.bannedPersonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BannedPerson | string> {
    return this.bannedPersonsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBannedPersonDto: UpdateBannedPersonDto,
  ): Promise<BannedPerson | string> {
    return this.bannedPersonsService.update(Number(id), updateBannedPersonDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() uploaderEmail: { uploaderEmail: string },
  ): Promise<BannedPerson | string> {
    return this.bannedPersonsService.remove(
      Number(id),
      uploaderEmail.uploaderEmail,
    );
  }

  // @Patch('/alert/:id')
  // alert(
  //   @Param('id') id: string,
  //   @Body() dto: { descision: boolean; uploaderRole: number },
  // ) {
  //   return this.bannedPersonsService.alert(
  //     Number(id),
  //     dto.descision,
  //     dto.uploaderRole,
  //   );
  // }

  // @Patch('/ban-decision/:id')
  // alert(
  //   @Param('id') id: string,
  //   @Body() dto: { descision: boolean; uploaderEmail: number },
  // ) {
  //   return this.bannedPersonsService.banDecision(
  //     Number(id),
  //     dto.descision,
  //     dto.uploaderEmail,
  //   );
}
