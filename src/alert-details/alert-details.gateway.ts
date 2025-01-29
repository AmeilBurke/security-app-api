import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import * as fs from 'fs';
import { decryptString } from 'src/bcrypt/bcrypt';
import dayjs from 'dayjs';

@WebSocketGateway({
  cors: true,
  connectionStateRecovery: {
    maxDisconnectionDuration: 1 * 60 * 1000,
    skipMiddleWares: false,
  },
})
export class AlertDetailsGateway {
  constructor(
    private readonly alertDetailsService: AlertDetailsService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // console.log(`${socket.id} - connected @ ${dayjs()}`);
      console.log(`${socket.id} - connected to Alert Details gateway`);

      socket.on('disconnect', () => {
        console.log(`${socket.id} - disconnected`);
      });

      if (socket.recovered) {
        console.log(`session ${socket.id} was recovered`);
      }
    });
  }

  @SubscribeMessage('createAlertDetail')
  async create(
    @MessageBody()
    createAlertDetailDto: CreateAlertDetailDto & { fileData: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.handshake.headers.jwt) {
      return 'no valid JWT token found';
    }

    const decryptedToken = await decryptString(
      String(client.handshake.headers.jwt),
    );

    let payload: { sub: number; email: string; iat: number; exp: number };
    try {
      payload = await this.jwtService.verifyAsync(decryptedToken, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error: unknown) {
      // need to look at this in frontend to see what they get
      console.log(error);

      throw new WsException('JWT Token is expired or invalid');
      // return error;
    }

    // console.log(`payload: ${payload}`)

    let fileExtension: string;

    switch (createAlertDetailDto.fileData[0]) {
      case '/':
        fileExtension = 'jpg';
        break;

      case 'i':
        fileExtension = 'png';
        break;

      case 'U':
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
      this.server,
    );
  }

  @SubscribeMessage('updateAlertDetail')
  async update(
    @MessageBody() updateAlertDetailDto: UpdateAlertDetailDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.handshake.headers.jwt) {
      return 'no valid JWT token found';
    }

    const decryptedToken = await decryptString(
      String(client.handshake.headers.jwt),
    );

    const payload = await this.jwtService.verifyAsync(decryptedToken, {
      secret: process.env.JWT_SECRET,
    });

    let fileExtension: string;
    let imageName: string = '';

    if (updateAlertDetailDto.alertDetail_imageName) {
      switch (updateAlertDetailDto.alertDetail_imageName[0]) {
        case '/':
          fileExtension = 'jpg';
          break;

        case 'i':
          fileExtension = 'png';
          break;

        case 'U':
          fileExtension = 'webp';
      }
      imageName = `${uuidv4()}.${fileExtension}`;

      const filePath = path.join('src\\images\\people', `${imageName}`);
      const fileBuffer = Buffer.from(
        updateAlertDetailDto.alertDetail_imageName,
        'base64',
      );
      fs.writeFileSync(filePath, fileBuffer);
    }

    return this.alertDetailsService.update(
      payload,
      updateAlertDetailDto,
      imageName,
      this.server,
    );
  }

  // needs to be tested
  @SubscribeMessage('deleteAllAlertDetail')
  async delete(@ConnectedSocket() client: Socket) {
    return this.alertDetailsService.remove(this.server);
  }
}
