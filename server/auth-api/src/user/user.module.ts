import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';

import { UserController } from './controller/user.controller';
import { User } from './model/entities/user.entity';
import { UserHelperService } from './services/user-helper/user-helper.service';
import { UserService } from './services/user-service/user.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), AuthModule, MailModule],
  providers: [UserService, UserHelperService],
})
export class UserModule {}
