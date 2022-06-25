import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';
import { AuthListenerController } from './controllers/auth-listener.controller';

@Module({
  controllers: [AuthListenerController],
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
    UserModule,
  ],
  exports: [ClientsModule],
})
export class MQClientModule {}
