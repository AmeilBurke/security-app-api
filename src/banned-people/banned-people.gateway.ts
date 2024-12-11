import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { BannedPeopleService } from './banned-people.service';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@WebSocketGateway({ cors: true })
export class BannedPeopleGateway {
  constructor(
    private bannedPeopleService: BannedPeopleService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`${socket.id} - connected`);
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

    const payload = await this.jwtService.verifyAsync(
      String(client.handshake.headers.jwt),
      { secret: process.env.JWT_SECRET },
    );

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
