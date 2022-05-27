import { Injectable } from '@nestjs/common';
import { CreateDto } from 'src/user/model/dtos/signup.dto';
import { UpdateDto } from 'src/user/model/dtos/update.dto';
import { CreateUserI } from 'src/user/model/interfaces/create-user.interface';
import { UpdateInfoI } from 'src/user/model/interfaces/update-name.interface';

@Injectable()
/**
 * this service is just a helper service in the user module
 */
export class UserHelperService {
  /**
   * this function transform the request body from the UserDto schema to the
   * the UserI schema used inside the api.
   *
   * using this apprach gives more flexibility to the front end team to
   * update the schema of the request body as they want and you will only
   * need to modify the DTO and this Helper function.
   * @param dto
   */
  signupDtoToInstance(dto: CreateDto): CreateUserI {
    return {
      Email: dto.userEmail,
      Password: dto.userPassword,
      FirstName: dto.userFName,
      LastName: dto.userLName,
    };
  }

  updateDtoToInstace(dto:UpdateDto):UpdateInfoI{
    return{
      FirstName:dto.userFName,
      LastName:dto.userLName,
      Password:dto.userPassword
    }
  }
}
