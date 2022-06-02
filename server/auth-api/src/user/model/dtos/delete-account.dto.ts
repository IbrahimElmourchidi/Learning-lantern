import { Matches } from 'class-validator';

export class DeleteAccountDto {
  @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
  userPassword: string;
}
