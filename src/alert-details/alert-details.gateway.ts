import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'socket.io';
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

  // make is so an uplaod of an alert returns all of them, same for edits & cron job the removes at 6am

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

    const filePath = path.join('src\\images\\people', `${imageName}`);
    const fileBuffer = Buffer.from(createAlertDetailDto.fileData, 'base64');
    fs.writeFileSync(filePath, fileBuffer);

    return this.alertDetailsService.create(
      payload,
      createAlertDetailDto,
      imageName,
      fileExtension,
      this.server,
    );
  }

  // @SubscribeMessage('updateAlertDetail')
  // update(@MessageBody() updateAlertDetailDto: UpdateAlertDetailDto) {
  //   return this.alertDetailsService.update(updateAlertDetailDto.id, updateAlertDetailDto);
  // }
}
