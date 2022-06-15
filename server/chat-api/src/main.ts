import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const authListener = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: config.get('MQ_URLS').split(' '),
      queue: config.get('AUTH_QUEUE'),
      queueOptions: {
        durable: config.get('MQ_DURABLE'),
      },
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  await app.startAllMicroservices();
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`chat-api listening on port ${port}`));
}

bootstrap();
