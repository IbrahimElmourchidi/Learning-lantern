import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { UserI } from '../model/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  /**
   *
   * check if user with the given id exists, if the database lookup fails
   * throw InternalServerError
   *
   * @param Id The Id of the user you want to get
   * @returns Promise with the user object found in the database
   */
  async getUserById(Id: string): Promise<User> {
    return this.userRepo.findOne({ where: { Id } });
  }

  async createUser(user: UserI) {
    try {
      this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  async deleteUser(Id: string) {
    try {
      this.userRepo.delete(Id);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
}
