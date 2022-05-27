import { IsString, Length } from 'class-validator';

import { LoginDto } from './login.dto';

export class CreateDto extends LoginDto {
  @IsString()
  @Length(2, 30)
  userFName: string;
  @IsString()
  @Length(2, 60)
  userLName: string;
}
