import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import dayjs from 'dayjs';
import { Server, Socket } from 'socket.io';
import { capitalizeString } from 'src/utils';
@WebSocketGateway({
  cors: true,
  connectionStateRecovery: true,
  pingInterval: 25000,
  pingTimeout: 60000,
})
export class BannedPeopleGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // need to come back to this logic when front end is done
      if (!socket.handshake.headers.cookie) {
        console.log('connection refused');
        socket.disconnect();
      }

      console.log(
        `${socket.id} - connected to Banned People gateway @ ${dayjs()}`,
      );

      socket.on('disconnect', () => {
        console.log(
          `${socket.id} - disconnected from Banned People gateway @ ${dayjs()}`,
        );
      });

      if (socket.recovered) {
        console.log(
          `${socket.id} - disconnected but recovered to Banned People gateway @ ${dayjs()}`,
        );
      }
    });
  }

  @SubscribeMessage('addBannedPerson')
  create(
    @MessageBody() accountName: { account_name: string },
    @ConnectedSocket() socket: Socket,
  ): void {
    // send this when admin approves a ban or uploads one, not when security put in a pending request
    this.server.emit('bannedPersonCreated', {
      message: `${capitalizeString(accountName.account_name)} has uploaded a new ban`,
    });
  }
}
