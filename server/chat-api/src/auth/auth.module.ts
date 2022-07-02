import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // secret: Buffer.from(encodeURI(process.env.JWT_SECRET), 'utf8'),
      secret: process.env.JWT_SECRET,
      verifyOptions: {},
    }),
  ],
  providers: [JwtStrategy, JwtGuard, AuthService],
  exports: [PassportModule, AuthService, JwtModule],
})
export class AuthModule {}
