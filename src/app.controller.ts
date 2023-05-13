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

export interface DtoMessage {
    text: string;
  }

@Controller('messages')
export class MessagesController {
    constructor(private appGateway: AppGateway) {}

    //@WebSocketServer() wss: Server;

    @Post('test')
    createMessage(@Body() dto: DtoMessage) 
    {
        if (this.appGateway.wss) 
        {
            this.appGateway.wss.emit('msgToClient', dto.text);
            console.log('POST REQUEST TO SECOND SERVER TEST PASSED');
        } 
        else 
        {
            console.log('WebSocket server is not initialized yet');
        }
    }
}
