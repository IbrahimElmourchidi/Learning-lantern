import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from 'env/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './chat/model/entities/room.entity';
import { User } from './user/model/entities/user.entity';
import { MQClientModule } from './MQClient/MQClient.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        synchronize: config.get('DB_SYNC'),
        entities: [User, Room],
      }),
    }),
    MQClientModule,
    ChatModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
