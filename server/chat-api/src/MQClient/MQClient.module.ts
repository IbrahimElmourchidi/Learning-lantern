import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQModule } from 'nestjs-rmq';
import { RMQ_PROTOCOL } from 'nestjs-rmq/dist/constants';
import { UserModule } from 'src/user/user.module';
import { AuthListenerController } from './controllers/auth-listener.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ListenService } from './listen.service';
@Module({
  controllers: [AuthListenerController],
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'chat_serv',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: process.env.MQ_URLS.split(' '),
    //       queue: 'auth',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
    // RMQModule.forRoot({
    //   serviceName: 'auth',
    //   exchangeName: 'LearningLantern',
    //   isExchangeDurable: false,
    //   queueOptions: {
    //     durable: true,
    //   },
    //   assertExchangeType: 'fanout',
    //   connections: [
    //     {
    //       protocol: RMQ_PROTOCOL.AMQP,
    //       port: 5672,
    //       vhost: 'anjnybcr',
    //       login: 'anjnybcr',
    //       password: 'eENEQlY_XOfWRsgzp_lI54bqwSWafbDH',
    //       host: 'rattlesnake.rmq.cloudamqp.com',
    //     },
    //   ],
    // }),
    UserModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'LearningLantern',
          type: 'direct',
        },
      ],
      uri: 'amqps://anjnybcr:eENEQlY_XOfWRsgzp_lI54bqwSWafbDH@rattlesnake.rmq.cloudamqp.com/anjnybcr',
      enableControllerDiscovery: true,
    }),
  ],
  providers: [ListenService],
  exports: [RabbitMQModule],
})
export class MQClientModule {}
