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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private readonly authService: AuthService,
    private mailer: MailService,
  ) {}

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
    this.mailer.sendValidationEmail(
      dbUser.Id,
      dbUser.ValidationCode,
      dbUser.Email,
    );
    return true;
  }

  async getAllUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    const all = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.Profile', 'Profile');
    let rrr = await paginate<User>(all, options);
    return rrr;
  }

  async getUserById(Id: string): Promise<User> {
    try {
      return this.userRepo.findOne({ where: { Id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error,Database Error',
      );
    }
  }

  // update the first and last names
  async updateUserName(Id: string, updateInstace: UpdateInfoI): Promise<User> {
    // check if user even exist
    const user = await this.getUserById(Id);
    if (!user) throw new NotFoundException('user not found');
    const passOk = await this.comparePass(
      updateInstace.Password,
      user.Password,
    );
    if (!(user && passOk))
      throw new UnauthorizedException('invalid credentials');
    delete updateInstace.Password;
    const newUser = this.assignObject(user, updateInstace) as User;
    return this.updateUser(newUser);
  }

  // change password
  async changePassword(
    id: string,
    changePassInstance: ChangePassI,
  ): Promise<User> {
    // check if user exist
    const user = await this.getUserById(id);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    // check if old pass correct
    const passOk = await this.comparePass(
      changePassInstance.OldPass,
      user.Password,
    );
    if (!passOk) throw new UnauthorizedException('Invalid credentials');
    // hash the password
    const newHash = await bcrypt.hash(changePassInstance.NewPass, 8);
    // save the new password
    user.Password = newHash;
    return this.modifyUser(user);
  }

  // login user
  async login(LoginInstance: LoginI): Promise<string> {
    // check if user exists
    let user = await this.getUserByEmail(LoginInstance.Email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    let passMatch = await this.comparePass(
      LoginInstance.Password,
      user.Password,
    );
    if (!passMatch) throw new UnauthorizedException('invalid credentials');
    return this.authService.generateToken(user);
  }

  // change email
  async changeEmail(Id: string, changeEmailInstance: LoginI) {
    // check if user exist
    const user = await this.getUserById(Id);
    if (!user) throw new NotFoundException('User Not Found');
    // check if the pass ok
    const passOk = await this.comparePass(
      changeEmailInstance.Password,
      user.Password,
    );
    if (!passOk) throw new UnauthorizedException('invalid credentials');
    user.Email = changeEmailInstance.Email.toLocaleLowerCase();
    user.ValidationCode = await this.generateCode(8);
    user.IsValidated = false;
    this.mailer.sendValidationEmail(user.Id, user.ValidationCode, user.Email);
    return this.modifyUser(user);
  }

  // delete account
  async deleteAccount(id: string, deleteAccount: DeleteAccountI) {
    // check if user exist
    const user = await this.getUserById(id);
    if (!user) throw new UnauthorizedException('invalid credentials');
    // check if pass ok
    const passOk = await this.comparePass(
      deleteAccount.Password,
      user.Password,
    );
    if (!passOk) throw new UnauthorizedException('Invalid Credentials');
    try {
      return this.userRepo.delete(user.Id);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

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
    this.modifyUser(user);
    return this.authService.generateToken(user);
  }

  async resendValidation(id: string): Promise<true> {
    // check if user exist
    const user = await this.getUserById(id);
    if (!user) throw new NotFoundException('user not found');
    // send the validation email
    this.mailer.sendValidationEmail(user.Id, user.ValidationCode, user.Email);
    return true;
  }

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
  private async generateCode(len: number): Promise<string> {
    const buffer = randomBytes(Math.floor(len / 2)) as Buffer;
    return buffer.toString('base64url');
  }
  private async saveUser(createInstance: CreateUserI): Promise<User> {
    try {
      return this.userRepo.save(createInstance);
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error, Database Error',
      );
    }
  }

  private async comparePass(pass, hash): Promise<boolean> {
    return bcrypt.compare(pass, hash);
  }

  private assignObject(start: Object, assign: Object) {
    return Object.assign(start, assign);
  }

  private updateUser(user: User): Promise<User> {
    try {
      return this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error, Database Error',
      );
    }
  }

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

  private modifyUser(user: User): Promise<User> {
    try {
      return this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
}
