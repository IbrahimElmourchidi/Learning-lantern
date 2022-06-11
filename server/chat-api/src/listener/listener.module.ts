import { DynamicModule, Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { AuthListenerController } from './controllers/admin-listener.controller';

@Module({
  controllers: [AuthListenerController],
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
            durable: config.get('MQ_DURABLE'),
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
