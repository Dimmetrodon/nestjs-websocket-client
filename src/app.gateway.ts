import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) 
  {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket)
  {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[])
  {
    this.logger.log(`Client connected: ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> 
  {
    return {event: 'msgToClient', data: 'Hello World!'}; 
  }
}
