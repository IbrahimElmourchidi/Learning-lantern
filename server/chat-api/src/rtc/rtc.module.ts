import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { Meeting } from './model/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), ChatModule],
})
export class RtcModule {}
