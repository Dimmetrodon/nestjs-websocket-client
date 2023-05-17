import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import { grpcClientOptions } from './grpc.options';

async function bootstrap() 
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.connectMicroservice(grpcClientOptions);
  await app.listen(3000); //websocket port
  await app.startAllMicroservices();
}
bootstrap();
