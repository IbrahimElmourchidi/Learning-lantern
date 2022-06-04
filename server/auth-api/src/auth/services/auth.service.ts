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
  async generateToken(user: Partial<User>): Promise<string> {
    const payload = this.generatePayload(user);
    return this.jwt.signAsync(payload);
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
      userId: user['Id'],
      userFName: user['FirstName'],
      isValidated: user['IsValidated'],
    };
  }
}
