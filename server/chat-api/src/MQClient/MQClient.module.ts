import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQModule } from 'nestjs-rmq';
import { RMQ_PROTOCOL } from 'nestjs-rmq/dist/constants';
import { UserModule } from 'src/user/user.module';
import { AuthListenerController } from './controllers/auth-listener.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ListenService } from './listen.service';
import { ListenerHelperService } from './listen-helper.service';
@Module({
  controllers: [AuthListenerController],
  imports: [
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
  providers: [ListenService, ListenerHelperService],
  exports: [RabbitMQModule, ListenerHelperService],
})
export class MQClientModule {}
