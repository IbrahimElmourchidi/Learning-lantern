import { Injectable } from '@nestjs/common';
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
    return this.joinedRoomRepo.save(joinedRoom);
  }
  async findByUser(user: UserI): Promise<JoinedRoomI[]> {
    return this.joinedRoomRepo.find({ where: { user } });
  }
  async findByRoom(room: RoomI): Promise<JoinedRoomI[]> {
    return this.joinedRoomRepo.find({ where: { room } });
  }
  async deleteBySocketId(SocketId: string) {
    return this.joinedRoomRepo.delete({ SocketId });
  }
  async deleteAll() {
    await this.joinedRoomRepo.createQueryBuilder().delete().execute();
  }
}
