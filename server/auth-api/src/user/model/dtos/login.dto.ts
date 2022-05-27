import { IsEmail, Matches } from 'class-validator';

export class LoginDto {
  @IsEmail()
  userEmail: string;
  @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
  userPassword: string;
}
