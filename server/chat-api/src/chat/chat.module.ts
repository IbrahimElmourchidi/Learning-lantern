import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';
import { ConnectedUser } from './model/entities/connected-user.entity';
import { JoinedRoom } from './model/entities/joined-room.entity';
import { Message } from './model/entities/message.entity';
import { Room } from './model/entities/room.entity';
import { ConnectedUserService } from './services/connected-user.service';
import { JoinedRoomService } from './services/joined-room.service';

import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Room, ConnectedUser, Message, JoinedRoom]),
    AuthModule,
    UserModule,
  ],
  providers: [
    ChatGateway,
    RoomService,
    ConnectedUserService,
    JoinedRoomService,
    MessageService,
  ],
  exports: [],
})
export class ChatModule {}
