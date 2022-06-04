import { Injectable } from '@nestjs/common';
import { changePasswordDto } from 'src/user/model/dtos/changePassword.dto';
import { DeleteAccountDto } from 'src/user/model/dtos/delete-account.dto';
import { LoginDto } from 'src/user/model/dtos/login.dto';
import { CreateDto } from 'src/user/model/dtos/signup.dto';
import { UpdateDto } from 'src/user/model/dtos/update.dto';
import { ValidateEmailDto } from 'src/user/model/dtos/validate-email.dto';
import { ChangePassI } from 'src/user/model/interfaces/change-password.interface';
import { CreateUserI } from 'src/user/model/interfaces/create-user.interface';
import { DeleteAccountI } from 'src/user/model/interfaces/delete-account.interface';
import { LoginI } from 'src/user/model/interfaces/login.interface';
import { UpdateInfoI } from 'src/user/model/interfaces/update-name.interface';
import { ValidateEmailI } from 'src/user/model/interfaces/validate-email.interface';

/**
 *
 * this service is just a helper service in the user module that makes sure
 * that the Dtos are transformed to the valid schema used in the api
 *
 */
@Injectable()
export class UserHelperService {
  /**
   * this function transform the request body from the UserDto schema to the
   * the UserI schema used inside the api.
   * using this apprach gives more flexibility to the front end team to
   * update the schema of the request body as they want and you will only
   * need to modify the DTO and this Helper function.
   * @param dto
   * @returns
   */
  signupDtoToInstance(dto: CreateDto): CreateUserI {
    return {
      Email: dto.userEmail,
      Password: dto.userPassword,
      FirstName: dto.userFName,
      LastName: dto.userLName,
    };
  }

  /**
   * Transform the UpdateDTo to the UpdateInfoI (which is the valid schema used in the api)
   *
   * @param dto
   * @returns
   */
  updateDtoToInstace(dto: UpdateDto): UpdateInfoI {
    return {
      FirstName: dto.userFName,
      LastName: dto.userLName,
      Password: dto.userPassword,
    };
  }

  /**
   * Transform the LoginDTo to the LoginI (which is the valid schema used in the api)
   * @param dto
   * @returns
   */

  loginDtoToInstance(dto: LoginDto): LoginI {
    return {
      Email: dto.userEmail,
      Password: dto.userPassword,
    };
  }

  /**
   * Transform the ChangePasswordDTo to the ChangePassI (which is the valid schema used in the api)
   * @param dto
   * @returns
   */
  changePassDtoToInstance(dto: changePasswordDto): ChangePassI {
    return {
      OldPass: dto.oldPassword,
      NewPass: dto.newPassword,
    };
  }

  /**
   * Transform the DeleteAccountDTo to the DeleteAccountI (which is the valid schema used in the api)
   * @param dto
   * @returns
   */
  deleteAccountDtoToInstance(dto: DeleteAccountDto): DeleteAccountI {
    return {
      Password: dto.userPassword,
    };
  }
  /**
   * Transform the ValidateEmialDTo to the ValidateEmailI (which is the valid schema used in the api)
   * @param dto
   * @returns
   */
  validateDtoToInstance(dto: ValidateEmailDto): ValidateEmailI {
    return {
      Id: dto.userId,
      ValidationCode: dto.validationCode,
    };
  }
}
