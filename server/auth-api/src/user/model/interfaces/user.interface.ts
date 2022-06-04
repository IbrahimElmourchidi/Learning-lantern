import { Profile } from '../entities/profile.entity';
/**@ignore */
export interface UserI {
  /**@ignore */
  Id: string;
  /**@ignore */
  Email: string;
  /**@ignore */
  Password: string;
  /**@ignore */
  DateCreated: Date;
  /**@ignore */
  ValidationCode: string;
  /**@ignore */
  IsValidated: boolean;
  /**@ignore */
  role: number;
  /**@ignore */
  Profile: Profile;
}
