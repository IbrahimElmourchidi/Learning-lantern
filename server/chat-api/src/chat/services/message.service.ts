import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UserI } from 'src/user/model/interfaces/user.interface';
import { Repository } from 'typeorm';
import { Message } from '../model/entities/message.entity';
import { MessageI } from '../model/interfaces/message.interface';
import { RoomI } from '../model/interfaces/room.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  async create(message: MessageI, user: UserI) {
    message.user = user;
    return this.messageRepo.save(this.messageRepo.create(message));
  }

  async findMessagesFromRoom(
    room: RoomI,
    options: IPaginationOptions,
  ): Promise<Pagination<MessageI>> {
    const query = this.messageRepo
      .createQueryBuilder('message')
      .leftJoin('message.room', 'room')
      .where('room.Id = :roomId', { roomId: room.Id })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.created_at', 'DESC');

    return paginate(query, options);
  }
}