import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
/**
 * This is the entry point of the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`auth-api listening on port ${port}`);
  });
}
/**@ignore */
bootstrap();
