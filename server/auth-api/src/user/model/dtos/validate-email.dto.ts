import { IsString } from 'class-validator';

export class ValidateEmailDto {
  @IsString()
  userId: string;
  @IsString()
  validationCode: string;
}
