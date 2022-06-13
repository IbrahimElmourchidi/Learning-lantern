import { DynamicModule, Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AuthListenerController } from './controllers/auth-listener.controller';

@Module({
  controllers: [AuthListenerController],
  imports: [UserModule],
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
