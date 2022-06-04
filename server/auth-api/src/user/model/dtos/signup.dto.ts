import { IsString, Length } from 'class-validator';

import { LoginDto } from './login.dto';
/**@ignore */
export class CreateDto extends LoginDto {
  /**@ignore */
  @IsString()
  @Length(2, 30)
  userFName: string;
  /**@ignore */
  @IsString()
  @Length(2, 60)
  userLName: string;
}
