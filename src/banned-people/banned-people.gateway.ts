import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import dayjs from 'dayjs';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: true,
  connectionStateRecovery: true,
  pingInterval: 25000,
  pingTimeout: 60000,
})
export class BannedPeopleGateway {
  @WebSocketServer()
  server: Server;

  // onModuleInit() {
  //   this.server.on('connection', (socket: Socket) => {
  //     console.log(
  //       `${socket.id} - connected to Banned People gateway @ ${dayjs()}`,
  //     );

  //     socket.on('disconnect', () => {
  //       console.log(
  //         `${socket.id} - disconnected from Banned People gateway @ ${dayjs()}`,
  //       );
  //     });

  //     if (socket.recovered) {
  //       console.log(
  //         `${socket.id} - disconnected but recovered to Banned People gateway @ ${dayjs()}`,
  //       );
  //     }
  //   });
  // }

  // @SubscribeMessage('addBannedPerson')
  // create(
  //   @MessageBody() accountName: { account_name: string },
  //   @ConnectedSocket() socket: Socket,
  // ): void {
  //   // need to test adding cookie to WS request when doing front-end
  //   // need to add jwt check here
  //   // send this when admin approves a ban or uploads one, not when security put in a pending request
  //   this.server.emit('bannedPersonCreated', {
  //     message: `${accountName.account_name} has uploaded a new ban`,
  //   });
  // }
}
