import { Profile } from '../entities/profile.entity';

export interface UserI {
  Id: string;
  Email: string;
  Password: string;
  DateCreated: Date;
  ValidationCode: string;
  IsValidated: boolean;
  role: number;
  Profile: Profile;
}
