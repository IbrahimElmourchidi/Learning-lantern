import { IsString, Length, Matches } from 'class-validator';

/**@ignore */
export class UpdateDto {
  /**@ignore */
  @IsString()
  @Length(2, 30)
  userFName: string;
  /**@ignore */
  @IsString()
  @Length(2, 60)
  userLName: string;
  /**@ignore */
  @IsString()
  @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
  userPassword: string;
}
