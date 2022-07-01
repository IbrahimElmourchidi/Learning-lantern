/**
 * this interface defines What info JWT payload Contains
 */
export interface PayloadI {
  sub: string;
  FirstName: string;
  LastName: string;
  EmailConfirmed: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

export enum RoleEnum {
  Admin = 'Admin',
  Instructor = 'Instructor',
  UniversityAdmin = 'UniversityAdmin',
  Student = 'Student',
}
