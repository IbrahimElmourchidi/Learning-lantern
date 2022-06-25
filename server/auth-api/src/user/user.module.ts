import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ListenerModule } from 'src/listener/listener.module';
import { MailModule } from 'src/mail/mail.module';

import { UserController } from './controller/user.controller';
import { Profile } from './model/entities/profile.entity';
import { User } from './model/entities/user.entity';
import { UserHelperService } from './services/user-helper/user-helper.service';
import { UserService } from './services/user-service/user.service';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    AuthModule,
    MailModule,
    ListenerModule,
  ],
  providers: [UserService, UserHelperService],
  exports: [],
})
export class UserModule {}
