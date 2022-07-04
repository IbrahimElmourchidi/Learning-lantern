import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserI } from 'src/user/model/interfaces/user.interface';
import { Repository } from 'typeorm';
import { JoinedRoom } from '../model/entities/joined-room.entity';
import { JoinedRoomI } from '../model/interfaces/joined-room.interface';
import { RoomI } from '../model/interfaces/room.interface';

@Injectable()
export class JoinedRoomService {
  constructor(
    @InjectRepository(JoinedRoom)
    private joinedRoomRepo: Repository<JoinedRoom>,
  ) {}

  async create(joinedRoom: JoinedRoomI): Promise<JoinedRoomI> {
    try {
      return this.joinedRoomRepo.save(joinedRoom);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
  async findByUser(user: UserI): Promise<JoinedRoomI[]> {
    try {
      return this.joinedRoomRepo.find({ where: { user } });
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
  async findByRoom(room: RoomI): Promise<JoinedRoomI[]> {
    try {
      return this.joinedRoomRepo.find({ where: { room } });
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
  async deleteBySocketId(SocketId: string) {
    try {
      return this.joinedRoomRepo.delete({ SocketId });
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
  async deleteAll() {
    try {
      await this.joinedRoomRepo.createQueryBuilder().delete().execute();
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
}
