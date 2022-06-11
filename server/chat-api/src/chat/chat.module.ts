import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChatGateway } from './gateways/chat.gateway';
@Module({
  imports: [AuthModule],
  providers: [ChatGateway],
  exports: [],
})
export class ChatModule {}
