import { Injectable } from '@nestjs/common';
import { UserI } from '../model/interfaces/user.interface';

@Injectable()
export class UserHelperService {
  constructor() {}
  createUserInstance(user: any): UserI {
    return {
      Id: user.Id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Role: user.role,
    };
  }
}
