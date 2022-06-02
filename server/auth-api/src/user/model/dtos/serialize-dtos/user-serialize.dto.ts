import { Expose, Transform } from 'class-transformer';
import { Profile } from '../../entities/profile.entity';

export class UserSerializeDto {
  @Expose()
  Id: string;

  @Expose()
  IsConfirmed: boolean;

  @Expose()
  IsValidated: boolean;

  @Expose()
  @Transform(({ obj }) => obj.Profile)
  Profile: Profile;
}
