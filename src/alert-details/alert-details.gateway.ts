import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Request } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { capitalizeString } from 'src/utils';

@WebSocketGateway({
  cors: {
    origin: ['https://172.20.112.1:5173', 'https://localhost:5173'],
    credentials: true,
  },
  allowEIO3: true,
  connectionStateRecovery: {
    maxDisconnectionDuration: 1 * 60 * 1000,
    skipMiddleWares: false,
  },
})
export class AlertDetailsGateway {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private prisma: PrismaService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      if (!socket.handshake.headers.cookie) {
        console.error(`WS ERROR: ${socket.id} - Missing JWT cookie`);
        socket.emit('missing_jwt', {
          error_type: 'WS MISSING COOKIE',
        });
        socket.disconnect();
        return;
      }

      const accountJwtDetails = await this.jwtService.verifyAsync(
        socket.handshake.headers.cookie.split('=')[1],
        { secret: process.env.JWT_SECRET },
      );

      if (!accountJwtDetails.sub) {
        socket.disconnect();
        return {
          error_type: 'WS MISSING COOKIE',
        };
      }

      console.log(
        `${socket.id} - connected to Alert Details gateway @ ${dayjs()}`,
      );

      socket.on('disconnect', () => {
        console.log(
          `${socket.id} - disconnected from Alert Details gateway @ ${dayjs()}`,
        );
      });

      if (socket.recovered) {
        console.log(
          `${socket.id} - disconnected but recovered to Alert Details gateway @ ${dayjs()}`,
        );
      }
    });
  }

  @SubscribeMessage('alert_detail_created')
  async create(
    @Request() request,
    @ConnectedSocket()
    socket: Socket,
  ): Promise<void> {
    try {
      const jwtToken = await this.jwtService.verifyAsync(
        socket.handshake.headers.cookie.split('=')[1],
        { secret: process.env.JWT_SECRET },
      );
      // need to get profile details form jwt to get account name
      console.log(jwtToken);

      const accountDetails = await this.prisma.account.findFirst({
        where: {
          account_id: jwtToken.sub,
        },
      });

      this.server.emit('alert_detail_created', {
        message: `${capitalizeString(accountDetails.account_name)} has uploaded an alert`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
