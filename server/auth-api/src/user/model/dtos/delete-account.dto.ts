import { Matches } from 'class-validator';

/**@ignore */
export class DeleteAccountDto {
  /**@ignore */
  @Matches('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,30}$')
  userPassword: string;
}
