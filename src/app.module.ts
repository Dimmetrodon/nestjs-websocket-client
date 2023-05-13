import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MessagesController } from './app.controller';


@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [AppGateway],
})
export class AppModule {}
