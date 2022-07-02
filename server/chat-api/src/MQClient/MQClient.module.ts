import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQModule } from 'nestjs-rmq';
import { RMQ_PROTOCOL } from 'nestjs-rmq/dist/constants';
import { UserModule } from 'src/user/user.module';
import { AuthListenerController } from './controllers/auth-listener.controller';

@Module({
  controllers: [AuthListenerController],
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'chat_serv',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: process.env.MQ_URLS.split(' '),
    //       queue: process.env.CHAT_QUEUE,
    //       queueOptions: {
    //         durable: process.env.MQ_DURABLE,
    //       },
    //     },
    //   },
    // ]),
    RMQModule.forRoot({
      serviceName: 'auth',
      queueName: 'auth',
      exchangeName: 'LearningLantern',
      isExchangeDurable: false,
      isQueueDurable: true,
      assertExchangeType: 'direct',
      connections: [
        {
          protocol: RMQ_PROTOCOL.AMQP,
          port: 5672,
          vhost: 'anjnybcr',
          login: 'anjnybcr',
          password: 'eENEQlY_XOfWRsgzp_lI54bqwSWafbDH',
          host: 'rattlesnake.rmq.cloudamqp.com',
        },
      ],
    }),
    UserModule,
  ],
  exports: [],
})
export class MQClientModule {}
