import { IsEmail, Matches } from 'class-validator';

/**@ignore */
export class LoginDto {
  /**@ignore */
  @IsEmail()
  userEmail: string;
  /**@ignore */
  @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
  userPassword: string;
}
