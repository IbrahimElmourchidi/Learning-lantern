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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 500 * 60,
        },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  providers: [JwtStrategy, JwtGuard, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
