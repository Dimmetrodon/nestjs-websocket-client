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

export interface DtoMessageToAll 
{
    text: string;
}

export interface DtoMessageToRoom 
{
    room: string;
    text: string;
}

@Controller('messages')
export class MessagesController {
    constructor(private appGateway: AppGateway) {}

    //@WebSocketServer() wss: Server;

    @Post('messagetoall')
    createMessageToAll(@Body() dto: DtoMessageToAll) 
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

    @Post('messagetoroom')
    createMessageToRoom(@Body() dto: DtoMessageToRoom) 
    {
        if (this.appGateway.wss) 
        {
            this.appGateway.wss.to(dto.room).emit('msgToClient', dto.text);
            console.log(`send message ${dto.text} to room ${dto.room}`)
        } 
        else 
        {
            console.log('WebSocket server is not initialized yet');
        }
    }

}
