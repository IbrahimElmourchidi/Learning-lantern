import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 500 * 60,
      },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [JwtStrategy, JwtGuard, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
