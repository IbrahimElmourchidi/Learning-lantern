import { Matches } from 'class-validator';

export class changePasswordDto {
  @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
  oldPassword: string;
  @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
  newPassword: string;
}
