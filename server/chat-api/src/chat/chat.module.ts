import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';
import { Room } from './model/entities/room.entity';
import { RoomService } from './services/room.service';
@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule, UserModule],
  providers: [ChatGateway, RoomService],
  exports: [],
})
export class ChatModule {}
