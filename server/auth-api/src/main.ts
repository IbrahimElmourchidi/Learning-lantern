import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
/**
 * This is the entry point of the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: configService.get('MQ_URLS').split(' '),
      queue: 'auth',
      queueOptions: {
        durable: false,
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
