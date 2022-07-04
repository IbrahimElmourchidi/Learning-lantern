import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './chat/model/entities/room.entity';
import { User } from './user/model/entities/user.entity';
import { MQClientModule } from './MQClient/MQClient.module';
import { ChatModule } from './chat/chat.module';
import { ConnectedUser } from './chat/model/entities/connected-user.entity';
import { JoinedRoom } from './chat/model/entities/joined-room.entity';
import { Message } from './chat/model/entities/message.entity';
import { RtcModule } from './rtc/rtc.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://svrhhoelaskgnb:a5e4ab9186c622679b6b5aa96fe55190fe8f1162500b1822a66378fd9808fb5d@ec2-3-218-171-44.compute-1.amazonaws.com:5432/dajv2oct01sbce?sslmode=require',
      synchronize: process.env.DB_SYNC == 'true',
      entities: [User, Room, ConnectedUser, JoinedRoom, Message],
    }),
    MQClientModule,
    RtcModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
