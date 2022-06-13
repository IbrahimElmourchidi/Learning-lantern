import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from 'env/config.schema';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { Room } from './chat/model/entities/room.entity';
import { ListenerModule } from './listener/listener.module';
import { User } from './user/model/entities/user.entity';
import { UserModule } from './user/user.module';

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
    ChatModule,
    ListenerModule,
  ],
  providers: [],
})
export class AppModule {}
