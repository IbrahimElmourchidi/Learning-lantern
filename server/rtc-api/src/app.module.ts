import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IoClientModule } from 'nestjs-io-client';
import { KurentoGateway } from './gateways/kurento.gateway';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.DB_SYNC == '1',
      entities: [],
    }),
    IoClientModule.forRoot({
      uri: `${process.env.KURENTO_URL}/kurento`,
      options: {
        port: 8888,
        reconnectionDelayMax: 10000,
        auth: { token: '123' },
        query: {
          foo: 'value',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, KurentoGateway],
})
export class AppModule {}
