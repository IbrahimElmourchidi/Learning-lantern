import { Expose, Transform } from 'class-transformer';
import { Profile } from '../../entities/profile.entity';

/**
 * the serialze schema of the user data
 */
export class UserSerializeDto {
  /**@ignore */
  @Expose()
  Id: string;
  /**@ignore */
  @Expose()
  IsConfirmed: boolean;
  /**@ignore */
  @Expose()
  IsValidated: boolean;
  /**@ignore */
  @Expose()
  @Transform(({ obj }) => obj.Profile)
  Profile: Profile;
}
