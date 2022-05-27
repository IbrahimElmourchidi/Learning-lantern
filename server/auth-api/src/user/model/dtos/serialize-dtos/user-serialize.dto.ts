import { Expose } from 'class-transformer';

export class UserSerializeDto {
  @Expose()
  Id: string;
  @Expose()
  FirstName: string;
  @Expose()
  LastName: string;
}
