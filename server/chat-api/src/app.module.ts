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
      url: process.env.DB_URL,
      synchronize: process.env.DB_SYNC == '1',
      entities: [User, Room, ConnectedUser, JoinedRoom, Message],
    }),
    MQClientModule,
    RtcModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
