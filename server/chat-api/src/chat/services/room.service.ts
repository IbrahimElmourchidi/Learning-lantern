import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from 'src/user/model/entities/user.entity';
import { Repository } from 'typeorm';
import { Room } from '../model/entities/room.entity';
import { RoomI } from '../model/interfaces/room.interface';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {}

  async createRoom(room: RoomI, creator: User): Promise<Room> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    console.log(newRoom);
    return this.roomRepo.save(newRoom);
  }

  async addCreatorToRoom(room: RoomI, creator: User): Promise<RoomI> {
    room.users.push(creator);
    return room;
  }

  async getRoomsForUser(
    Id: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Room>> {
    const query = this.roomRepo
      .createQueryBuilder('room')
      .leftJoin('room.users', 'user')
      .where('user.Id = :Id', { Id })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.Name', 'ASC');
    return paginate(query, options);
  }
}
