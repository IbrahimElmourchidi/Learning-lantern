import { DynamicModule, Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { AdminListenerController } from './controllers/admin-listener.controller';

@Module({
  controllers: [AdminListenerController],
  imports: [],
  exports: [],
})
export class ListenerModule {
  constructor(private config: ConfigService) {}

  static register(): DynamicModule {
    let options: ClientsProviderAsyncOptions = {
      name: 'auth_serv',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: config.get('MQ_URLS').split(' '),
          queue: 'auth',
          queueOptions: {
            durable: false,
          },
        },
      }),
    };
    return {
      module: ListenerModule,
      providers: [ConfigService],
      imports: [ClientsModule.registerAsync([options])],
      exports: [ClientsModule],
    };
  }
}
