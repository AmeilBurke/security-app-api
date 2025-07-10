import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
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

  @SubscribeMessage('createAlert')
  createAlert(
    @MessageBody() message: { account_name: string },
  ): void {
    this.server.emit('alertCreated', {
      message: `${capitalizeString(message.account_name)} has uploaded a new alert`,
    });
  }
}
