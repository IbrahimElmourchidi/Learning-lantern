import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IoClientModule } from 'nestjs-io-client';
import { OVController } from './controllers/ov.controller';

import { OVGateway } from './gateways/ov.gateway';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.DB_SYNC == '1',
      entities: [],
    }),
    IoClientModule.forRoot({
      uri: `${process.env.OV_URL}`,
      options: {
        port: 8888,
        reconnectionDelayMax: 10000,
      },
    }),
  ],
  controllers: [OVController, OVGateway],
  providers: [OVGateway],
})
export class AppModule {}
