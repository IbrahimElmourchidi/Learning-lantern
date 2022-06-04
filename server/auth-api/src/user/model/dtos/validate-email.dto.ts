import { IsString } from 'class-validator';
/**@ignore */
export class ValidateEmailDto {
  /**@ignore */
  @IsString()
  userId: string;
  /**@ignore */
  @IsString()
  validationCode: string;
}
