import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const authListener = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: process.env.MQ_URLS.split(' '),
      queue: process.env.AUTH_QUEUE,
      queueOptions: {
        durable: process.env.MQ_DURABLE,
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
  const port = process.env.PORT || 3006;
  app.listen(port, () => console.log(`rtc-api listening on port ${port}`));
}

bootstrap();
