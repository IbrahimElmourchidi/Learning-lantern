import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from '../env/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.${process.env.NODE_ENV}.env`,
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class ChatModule {}
