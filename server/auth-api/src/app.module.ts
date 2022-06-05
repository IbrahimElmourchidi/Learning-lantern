import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSchemaValidator } from 'environment/config.schema';
import { ListenerModule } from './listener/listener.module';

import { Profile } from './user/model/entities/profile.entity';
import { User } from './user/model/entities/user.entity';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environment/.env.${process.env.NODE_ENV}`,
      validationSchema: ConfigSchemaValidator,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        synchronize: config.get('DB_SYNC'),
        entities: [User, Profile],
      }),
    }),
    UserModule,
    ListenerModule,
  ],
})
export class AppModule {}
