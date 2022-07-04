import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * defines the strategy used for authenticatin , we are using JWT strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   *
   * you should invoke the super constructor .
   *
   * @param config
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * This method attach the pay load from the JWT to user property in the request
   * @param payload
   * @returns
   */
  async validate(payload: any) {
    console.log(payload);
    return payload;
  }
}
