import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RequestWithAccount } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'socket.io';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import * as fs from 'fs';

@WebSocketGateway({ cors: true })
export class AlertDetailsGateway {
  constructor(
    private readonly alertDetailsService: AlertDetailsService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`${socket.id} - connected`);
    });
  }

  @SubscribeMessage('createAlertDetail')
  async create(
    @MessageBody()
    createAlertDetailDto: CreateAlertDetailDto & { fileData: string },
    @ConnectedSocket() client: Socket,
  ) {
    const payload = await this.jwtService.verifyAsync(
      String(client.handshake.headers.jwt),
      { secret: process.env.JWT_SECRET },
    );

    
    let fileExtension: string;
    
    switch(createAlertDetailDto.fileData[0]) {
      case "/": 
      fileExtension = 'jpg';
      break;
      
      case "i": 
      fileExtension = 'png';
      break;
      
      case "U": 
      fileExtension = 'webp';
    }
    const imageName = `${uuidv4()}.${fileExtension}`;

    const filePath = path.join('src\\images\\people', `${imageName}.${fileExtension}`);
    const fileBuffer = Buffer.from(createAlertDetailDto.fileData, 'base64');
    fs.writeFileSync(filePath, fileBuffer);

    console.log(filePath);

    return this.alertDetailsService.create(
      payload,
      createAlertDetailDto,
      imageName,
      fileExtension,
      this.server,
    );
  }

  // @SubscribeMessage('findAllAlertDetails')
  // findAll() {
  //   return this.alertDetailsService.findAll();
  // }

  // @SubscribeMessage('findOneAlertDetail')
  // findOne(@MessageBody() id: number) {
  //   return this.alertDetailsService.findOne(id);
  // }

  // @SubscribeMessage('updateAlertDetail')
  // update(@MessageBody() updateAlertDetailDto: UpdateAlertDetailDto) {
  //   return this.alertDetailsService.update(updateAlertDetailDto.id, updateAlertDetailDto);
  // }

  // @SubscribeMessage('removeAlertDetail')
  // remove(@MessageBody() id: number) {
  //   return this.alertDetailsService.remove(id);
  // }
}
