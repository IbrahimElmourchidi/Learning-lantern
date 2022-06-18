import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserI } from 'src/user/model/interfaces/user.interface';
import { Repository } from 'typeorm';
import { ConnectedUser } from '../model/entities/connected-user.entity';
import { ConnectedUserI } from '../model/interfaces/connected-user.interface';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUser)
    private connectedUserRepo: Repository<ConnectedUser>,
  ) {}

  async create(connectedUser: ConnectedUserI): Promise<ConnectedUserI> {
    try {
      return this.connectedUserRepo.save(connectedUser);
    } catch (error) {
      throw new InternalServerErrorException('Database Error ');
    }
  }

  async findByUser(User: UserI): Promise<ConnectedUser[]> {
    try {
      return this.connectedUserRepo.find({ where: { user: User } });
    } catch {
      throw new InternalServerErrorException('database error');
    }
  }
  async deleteBySocketId(SocketId: string) {
    try {
      return this.connectedUserRepo.delete({ SocketId });
    } catch (error) {
      throw new InternalServerErrorException('database Error');
    }
  }

  async deleteAll() {
    try {
      await this.connectedUserRepo.createQueryBuilder().delete().execute();
    } catch (error) {
      throw new InternalServerErrorException('database error');
    }
  }
}
