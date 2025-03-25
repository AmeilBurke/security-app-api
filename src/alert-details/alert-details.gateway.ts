import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import dayjs from 'dayjs';

@WebSocketGateway({
  cors: true,
  connectionStateRecovery: {
    maxDisconnectionDuration: 1 * 60 * 1000,
    skipMiddleWares: false,
  },
})
export class AlertDetailsGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
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

  @SubscribeMessage('alertDetailCreated')
  create(
    @MessageBody()
    accountName: { account_name: string },
    @ConnectedSocket() socket: Socket,
  ): void {
    // need to test adding cookie to WS request when doing front-end
    // need to add jwt check here
    this.server.emit('alertDetailCreated', {message: `${accountName.account_name} has uploaded an alert`});
  }

  // posiblly add notification when alert is updated
}
