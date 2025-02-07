import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { BannedPeopleService } from './banned-people.service';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { decryptString } from 'src/bcrypt/bcrypt';

@WebSocketGateway({ cors: true, connectionStateRecovery: true })
export class BannedPeopleGateway {
  constructor(
    private bannedPeopleService: BannedPeopleService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`${socket.id} - connected to Banned People gateway`);
      if (socket.recovered) {
        console.log(`session: ${socket.id} recovered`);
      }
    });
  }

  @SubscribeMessage('addBannedPerson')
  async create(
    @MessageBody()
    createBannedPerson: CreateBannedPersonDto & {
      fileData: string;
      banDetails: {
        banDetails_reason: string;
        banDetails_banEndDate: string;
        banDetails_venueBanIds: number[];
      };
    },
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

    let fileExtension: string;

    switch (createBannedPerson.fileData[0]) {
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
    const fileBuffer = Buffer.from(createBannedPerson.fileData, 'base64');
    fs.writeFileSync(filePath, fileBuffer);

    return this.bannedPeopleService.create(
      payload,
      createBannedPerson,
      imageName,
      this.server,
    );
  }
}
