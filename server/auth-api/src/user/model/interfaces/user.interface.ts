export interface UserI {
  Id: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  DateCreated: Date;
  ValidationCode: string;
  IsValidated: boolean;
  role: number;
}
