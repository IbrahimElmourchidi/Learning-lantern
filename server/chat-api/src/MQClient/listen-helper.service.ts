import { Injectable } from '@nestjs/common';
import { PayloadI } from 'src/auth/model/interfaces/payload.interface';
import { UserI } from 'src/user/model/interfaces/user.interface';

@Injectable()
export class ListenerHelperService {
  userParser(user: PayloadI): UserI {
    return {
      Id: user.sub,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Role: user[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
    };
  }
}
