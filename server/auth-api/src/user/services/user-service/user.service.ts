import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { User } from 'src/user/model/entities/user.entity';
import { CreateUserI } from 'src/user/model/interfaces/create-user.interface';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateInfoI } from 'src/user/model/interfaces/update-name.interface';
import { LoginI } from 'src/user/model/interfaces/login.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { MailService } from 'src/mail/services/mail.service';
import { Profile } from 'src/user/model/entities/profile.entity';
import { changePasswordDto } from 'src/user/model/dtos/changePassword.dto';
import { ChangePassI } from 'src/user/model/interfaces/change-password.interface';
import { DeleteAccountI } from 'src/user/model/interfaces/delete-account.interface';
import { ValidateEmailI } from 'src/user/model/interfaces/validate-email.interface';

/**
 * This Service is concerned with all the database logic related to user entity
 */

@Injectable()
export class UserService {
  /**
   * The Constructor Function
   * @param userRepo  This repo allow CRUD operations on User Table in the database.
   * @param profileRepo This repo allow CRUD operations on the profile Table in the database
   * @param authService This Service responsible for all Authentication Authorization, and JWT generation.
   * @param mailerService This service is responsible for sending emails
   */
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private readonly authService: AuthService,
    private mailerService: MailService,
  ) {}

  /**
   *
   * Create New User
   *
   * @param createInstace The New User Instance that will be saved in the database
   * @returns true if creation was successfull, false otherwise
   */

  async createUser(createInstace: CreateUserI): Promise<boolean> {
    // check if user already exist and throw error if it is
    const user = await this.getUserByEmail(createInstace.Email);
    if (user) throw new ConflictException('User Already Exists');
    // hash the password
    const hash = await bcrypt.hash(createInstace.Password, 8);
    createInstace.Password = hash;
    // generate Validation Code
    const code = await this.generateCode(8);
    createInstace['ValidationCode'] = code;
    // create profile instance
    const profileInstance: Profile = await this.createProfile(
      createInstace.FirstName,
      createInstace.LastName,
    );
    createInstace.Profile = profileInstance;
    const dbUser = await this.saveUser(createInstace);
    this.mailerService.sendValidationEmail(
      dbUser.Id,
      dbUser.ValidationCode,
      dbUser.Email,
    );
    return true;
  }

  /**
   *
   * Return all Users Paginated
   *
   * @param options paginatin options
   * @returns
   */
  async getAllUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    const all = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.Profile', 'Profile');
    let result = await paginate<User>(all, options);
    return result;
  }

  /**
   *
   * check if user with the given id exists, if the database lookup fails
   * throw InternalServerError
   *
   * @param Id The Id of the user you want to get
   * @returns Promise with the user object found in the database
   */
  async getUserById(Id: string): Promise<User> {
    try {
      return this.userRepo.findOne({ where: { Id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error,Database Error',
      );
    }
  }

  /**
   *
   * update the first and last name of the user
   *
   * @param Id the id of the user you want to update .
   * @param updateInstace
   * @returns
   */
  // update the first and last names
  async updateUserName(Id: string, updateInstace: UpdateInfoI): Promise<User> {
    const user = await this.checkIdPass(Id, updateInstace.Password);
    // since the password is not changed then no need to hash, simply delete it
    delete updateInstace.Password;
    const newUser = this.assignObject(user, updateInstace) as User;
    return this.updateUser(newUser);
  }

  /**
   *
   * Change the current password of the user
   *
   * @param id the Id of the user you want to change its password
   * @param changePassInstance the old password to check credentials + the new password
   * @returns
   */
  // change password
  async changePassword(
    id: string,
    changePassInstance: ChangePassI,
  ): Promise<User> {
    //check if user exist and pass ok
    const user = await this.checkIdPass(id, changePassInstance.OldPass);
    // hash the new password
    const newHash = await bcrypt.hash(changePassInstance.NewPass, 8);
    // save the new password
    user.Password = newHash;
    return this.updateUser(user);
  }

  /**
   *
   * Login user with valid credentials
   *
   * @param LoginInstance
   * @returns JWT
   */
  // login user
  async login(LoginInstance: LoginI): Promise<{ token: string }> {
    // check if user exists
    const user = await this.checkEmailPass(
      LoginInstance.Email,
      LoginInstance.Password,
    );
    const token = await this.authService.generateToken(user);
    return { token };
  }

  /**
   *
   * Changes the user email
   *
   * @param Id the Id of the user you want to change its email ( the Id is extracted from the JWT)
   * @param changeEmailInstance new email + password to authorize the user
   * @returns
   */
  // change email
  async changeEmail(Id: string, changeEmailInstance: LoginI): Promise<User> {
    // check if user exist and pass ok
    const user = await this.checkIdPass(Id, changeEmailInstance.Password);
    // save the new emial (lower case)
    user.Email = changeEmailInstance.Email.toLocaleLowerCase();
    // generate new validtion code to be sent to the email for validation
    user.ValidationCode = await this.generateCode(8);
    // change the validation state to false
    user.IsValidated = false;
    // send validatin email to the new email
    this.mailerService.sendValidationEmail(
      user.Id,
      user.ValidationCode,
      user.Email,
    );
    // return the new user data
    return this.updateUser(user);
  }

  /**
   *
   * Delete the account of the user with the given id
   *
   * @param Id the Id of the user which you want to delete from the database(Id is extracted from JWT)
   * @param deleteAccountInstance the password to check credentials
   * @returns
   */
  // delete account
  async deleteAccount(Id: string, deleteAccountInstance: DeleteAccountI) {
    // check if user exist
    const user = await this.checkIdPass(Id, deleteAccountInstance.Password);
    try {
      return this.userRepo.delete(user.Id);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  /**
   *
   * the validate the account with the given id
   *
   * @param validationInstance  Id of the account you want to validate + validation code
   * @returns if the validatin was successful return JWT
   */
  // validate email
  async validateEmail(validationInstance: ValidateEmailI): Promise<string> {
    //check if user exist
    const user = await this.getUserById(validationInstance.Id);
    if (!user) throw new NotFoundException('user not found');
    // check if code ok
    if (user.ValidationCode !== validationInstance.ValidationCode)
      throw new BadRequestException('Wrong Validtion Code');
    user.IsValidated = true;
    user.ValidationCode = await this.generateCode(8);
    this.updateUser(user);
    return this.authService.generateToken(user);
  }

  /**
   *
   * resend validation email to the user with the given Id
   *
   * @param Id the Id of the user requesting the validation email (Extracted from the JWT)
   * @returns true if the user exist and false otherwise
   */
  async resendValidation(Id: string): Promise<true> {
    // check if user exist
    const user = await this.getUserById(Id);
    if (!user) throw new NotFoundException('user not found');
    // send the validation email
    this.mailerService.sendValidationEmail(
      user.Id,
      user.ValidationCode,
      user.Email,
    );
    return true;
  }

  /**
   *
   * This method checks if a user with the given email exists, if the database lookup fails return InternalServerError
   *
   * @param Email
   * @returns
   */

  private async getUserByEmail(Email: string): Promise<User> {
    try {
      let user = this.userRepo.findOne({ where: { Email } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error,Database Error',
      );
    }
  }

  /**
   *
   * this function generate random validation code with the given length
   *
   * @param len the length of the generated code
   * @returns
   */
  private async generateCode(len: number): Promise<string> {
    const buffer = randomBytes(Math.floor(len / 2)) as Buffer;
    return buffer.toString('base64url');
  }

  /**
   * This function is responsible for saving user to the database if the database insertion fails return InternalServerError
   * @param createInstance
   * @returns
   */
  private async saveUser(createInstance: CreateUserI): Promise<User> {
    try {
      return this.userRepo.save(createInstance);
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error, Database Error',
      );
    }
  }

  /**
   * This method compare the given password with the hash stored in the database
   * @param pass the plain text pass
   * @param hash the hash pass from the database
   * @returns true if match, false otherwise
   */
  private async comparePass(pass, hash): Promise<boolean> {
    return bcrypt.compare(pass, hash);
  }

  /**
   * helper function to assign the value of one object to another
   *
   * @param start the original object before assigning the new values
   * @param assign the new values that you want to assing
   * @returns the object with the new assigned values
   */
  private assignObject(start: Object, assign: Object) {
    return Object.assign(start, assign);
  }

  /**
   * This method update the user data in the database, if the insertion fails throw InternalServerError exception
   *
   * @param user the updated user instance you want to save
   * @returns
   */
  private updateUser(user: User): Promise<User> {
    try {
      return this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  /**
   *
   * Create Profile For the User
   *
   * @param FirstName
   * @param LastName
   * @returns
   */
  private createProfile(FirstName, LastName): Promise<Profile> {
    const profile = new Profile();
    profile.FirstName = FirstName;
    profile.LastName = LastName;
    try {
      return this.profileRepo.save(profile);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  /**
   * Check if the user with given Id really exist in the database & if the password is correct
   *
   * @param Id
   * @param Password
   * @returns
   */
  private async checkIdPass(Id: string, Password: string): Promise<User> {
    // check if user even exist
    const user = await this.getUserById(Id);
    if (!user) throw new NotFoundException('user not found');
    const passOk = await this.comparePass(Password, user.Password);
    if (!passOk) throw new UnauthorizedException('invalid credentials');
    return user;
  }

  /**
   *
   * Check if a User With the given Email really exist and if the password is correct
   *
   * @param Email
   * @param Password
   * @returns
   */
  private async checkEmailPass(Email: string, Password: string): Promise<User> {
    let user = await this.getUserByEmail(Email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    let passMatch = await this.comparePass(Password, user.Password);
    if (!passMatch) throw new UnauthorizedException('invalid credentials');
    return user;
  }
}
