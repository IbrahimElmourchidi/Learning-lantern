import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/entities/user.entity';
import { PayloadI } from '../model/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async generateToken(user: Partial<User>): Promise<string> {
    const payload = this.generatePayload(user);
    return this.jwt.signAsync(payload);
  }

  private generatePayload(user: Partial<User>): PayloadI {
    return {
      userId: user['Id'],
      userFName: user['FirstName'],
      isValidated: user['IsValidated'],
    };
  }
}
