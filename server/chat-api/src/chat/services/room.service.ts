import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Socket } from 'socket.io';
import { User } from 'src/user/model/entities/user.entity';
import { Repository } from 'typeorm';
import { Room } from '../model/entities/room.entity';
import { RoomI } from '../model/interfaces/room.interface';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {}

  async createRoom(room: Room, creator: User): Promise<Room> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    try {
      return this.roomRepo.save(newRoom);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  async joinRoom(roomId: string, user: User): Promise<Room> {
    let room = await this.getRoomById(roomId);
    room = await this.addCreatorToRoom(room, user);
    try {
      return this.roomRepo.save(room);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
  async addCreatorToRoom(room: RoomI, creator: User): Promise<RoomI> {
    room.users.push(creator);
    return room;
  }

  async getRoomById(Id: string): Promise<RoomI> {
    try {
      return this.roomRepo.findOne({ where: { Id }, relations: ['users'] });
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  async findRoomById(Id: string): Promise<Room> {
    try {
      return this.roomRepo
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.users', 'users')
        .where({ Id })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
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
    try {
      return paginate(query, options);
    } catch (error) {
      throw new InternalServerErrorException('Database Error');
    }
  }
}
