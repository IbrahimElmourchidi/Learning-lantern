import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/entities/user.entity';
import { PayloadI } from '../model/interfaces/payload.interface';

/**
 * This Service is responsible for all the Authentication & Authorization logic
 */
@Injectable()
export class AuthService {
  /**
   * the constructor
   * @param jwt the Jwtservice used for generating and verfieng JWT
   */
  constructor(private jwt: JwtService) {}

  /**
   * Generate JWT
   * @param user
   * @returns
   */
  async generateToken(user: Partial<User>): Promise<{ token: string }> {
    const payload = this.generatePayload(user);
    const token = await this.jwt.signAsync(payload);
    return { token: token };
  }

  async verifyJWT(token: string) {
    return this.jwt.verifyAsync(token);
  }

  /**
   *
   * Generate the Payload object according to the payload interface
   *
   * @param user
   * @returns
   */
  private generatePayload(user: Partial<User>): PayloadI {
    return {
      sub: user['Id'],
      FirstName: user['FirstName'],
      LastName: user['LastName'],
      EmailConfirmed: user['IsValidated'],
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role':
        user['role'],
    };
  }
}
