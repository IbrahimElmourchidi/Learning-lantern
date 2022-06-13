import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/entities/user.entity';
import { UserHelperService } from './services/user-helper.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserHelperService],
  exports: [UserService, UserHelperService],
})
export class UserModule {}
