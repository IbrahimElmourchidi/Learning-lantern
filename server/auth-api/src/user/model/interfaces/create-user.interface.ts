import { LoginI } from './login.interface';

export interface CreateUserI extends LoginI {
  FirstName: string;
  LastName: string;
}
