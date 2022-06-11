import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const authListener = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: config.get('MQ_URLS').split(' '),
      queue: 'auth',
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
  await app.listen(port, () => {
    console.log(`chat-api listening on port ${port}`);
  });
}
bootstrap();
