import { DynamicModule, Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  ClientsModule,
  ClientsModuleOptions,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { AdminListenerController } from './controllers/admin-listener.controller';

@Module({
  controllers: [AdminListenerController],
  imports: [
    ClientsModule.register([
      {
        name: 'auth_serv',
        transport: Transport.RMQ,
        options: {
          urls: process.env.MQ_URLS.split(' '),
          queue: process.env.AUTH_QUEUE,
          queueOptions: {
            durable: process.env.MQ_DURABLE,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ListenerModule {}
