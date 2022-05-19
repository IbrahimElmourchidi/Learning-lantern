import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSchemaValidator } from 'environment/config.schema';
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
        entities: [],
      }),
    }),
  ],
})
export class AppModule {}
