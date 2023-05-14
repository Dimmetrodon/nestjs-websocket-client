import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) 
  {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) 
  {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) 
  {
    this.logger.log(`Client connected: ${client.id}`);
  }

  //WEBSOCKET ONLY, DOES NOT AFFECT POST-METHOD
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void 
  {
    console.log('WEBSOCKET TEST PASSED')
    this.wss.emit('msgToClient', text);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string): void 
  {
    client.join(room);
    console.log(`JOINED ROOM: ${room}`)
  }
}
