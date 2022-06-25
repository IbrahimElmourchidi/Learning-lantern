import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

/**
 * This is the entry point of the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice2 = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: process.env.MQ_URLS.split(' '),
      queue: 'chat',
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
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`auth-api listening on port ${port}`);
  });
}
/**@ignore */
bootstrap();
