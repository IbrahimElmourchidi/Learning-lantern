import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenerModule } from './listener/listener.module';
import { Profile } from './user/model/entities/profile.entity';
import { User } from './user/model/entities/user.entity';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.DB_SYNC == '1',
      entities: [User, Profile],
    }),
    UserModule,
    ListenerModule,
  ],
})
export class AppModule {}
