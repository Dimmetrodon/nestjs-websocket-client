import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppGateway } from './app.gateway';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('messages')
export class MessagesControllerGrpc 
{
  constructor(private appGateway: AppGateway) {}

  @GrpcMethod('messageServiceGrpc', 'CreateMessageToRoomGrpc')
  createMessageToRoomGrpc(data: {room: string, text: string}) 
  {
    console.log('GRPC REQUEST TO SECOND SERVER RECEIVED');
    if (this.appGateway.wss) 
    {
        this.appGateway.wss.emit('msgToClient', data.text);
    }
    else 
    {
        console.log('WebSocket server is not initialized yet');
    }
    return data.text;
  }
}
