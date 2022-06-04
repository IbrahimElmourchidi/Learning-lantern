import { Profile } from '../entities/profile.entity';
import { LoginI } from './login.interface';
/**@ignore */
export interface CreateUserI extends LoginI {
  /**@ignore */
  FirstName: string;
  /**@ignore */
  LastName: string;
  /**@ignore */
  Profile?: Profile;
}
