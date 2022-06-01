import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
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
    const dbUser = await this.saveUser(createInstace);
    const mailOk = await this.mailer.sendValidationEmail(
      dbUser.Id,
      dbUser.ValidationCode,
      dbUser.Email,
    );
    return true;
  }

  async getAllUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepo, options);
  }

  async getUserById(Id: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { Id } });
      if (!user) throw new NotFoundException('User doesnot exist');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error,Database Error',
      );
    }
  }

  async updateUserName(Id: string, updateInstace: UpdateInfoI): Promise<User> {
    // check if user even exist
    const user = await this.getUserById(Id);
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

  // login user
  async login(LoginInstance: LoginI): Promise<string> {
    // check if user exists
    let user = await this.getUserByEmail(LoginInstance.Email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    let passMatch = this.comparePass(LoginInstance.Password, user.Password);
    if (!passMatch) throw new UnauthorizedException('invalid credentials');
    return this.authService.generateToken(user);
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
}
