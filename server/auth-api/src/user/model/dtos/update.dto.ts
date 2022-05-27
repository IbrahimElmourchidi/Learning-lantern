import { IsString, Length, Matches } from "class-validator";

export class UpdateDto{
    @IsString()
    @Length(2,30)
    userFName:string;
    @IsString()
    @Length(2,60)
    userLName:string;
    @IsString()
    @Matches('^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$')
    userPassword:string;
}