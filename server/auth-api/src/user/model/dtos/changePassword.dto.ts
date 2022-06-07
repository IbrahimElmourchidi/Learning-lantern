import { Matches } from 'class-validator';

/**@ignore */
export class changePasswordDto {
  /**@ignore */
  @Matches('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,30}$')
  oldPassword: string;
  /**@ignore */
  @Matches('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,30}$')
  newPassword: string;
}
