import { Injectable } from '@nestjs/common';
import * as kurento from 'kurento-client';
import { Server, Socket } from 'socket.io';
@Injectable()
export class KurentoService {
  iceCandidateQueues = {};
  sessions = {};
  kurentoCleint: kurento.ClientInstance;
  constructor() {
    this.getKurentoClient();
  }

  async getKurentoClient() {
    this.kurentoCleint = await kurento(process.env.KURENTO_URL, {});
  }

  async joinRoom(io: Server, socket: Socket, userName, roomName) {
    const myRoom = await this.getRoom(io, socket, roomName);
    const myPipeLine: kurento.MediaPipeline = myRoom.pipeLine;
    try {
      const outgoingMedia = await myPipeLine.create('WebRtcEndpoint');
      let user = {
        id: socket.id,
        name: userName,
        outgoingMedia,
        incomingMedia: {},
      };
      let iceCandidateQueue = this.iceCandidateQueues[user.id];
      while (iceCandidateQueue.length) {
        let iceCandidate = iceCandidateQueue.shift();
        user.outgoingMedia.addIceCandidate(iceCandidate.candidate);
      }
      user.outgoingMedia.on('OnIceCandidate', (event) => {
        var candidate = kurento.getComplexType('IceCandidate')(event.candidate);
        socket.emit('message', {
          event: 'candidate',
          userId: user.id,
          candidate: candidate,
        });
      });
      socket.to(roomName).emit('message', {
        event: 'newParticipantArrived',
        userId: user.id,
        userName,
      });

      let existingUsers = [];
      for (let i in myRoom.participants) {
        if (myRoom.participants[i].id !== user.id) {
          existingUsers.push({
            id: myRoom.participants[i].id,
            name: myRoom.participants[i].name,
          });
        }
      }

      socket.to(roomName).emit('message', {
        event: 'existingParticipants',
        existingUsers,
        userId: user.id,
      });

      myRoom.participants[user.id] = user;
    } catch (error) {
      console.log(error);
    }
  }

  recieveVideoFrom(socket, userId, userName, sdpOffer) {}

  addIceCandidate(socket, userId, roomName, candidate) {}

  async getRoom(io: Server, socket: Socket, roomName) {
    let myRoom = io.sockets.adapter.rooms[roomName] || { length: 0 };
    let numCleints = myRoom.length;
    if (numCleints == 0) {
      socket.join(roomName);
      myRoom = io.sockets.adapter.rooms[roomName];
      myRoom.pipeLine = await this.kurentoCleint.create('MediaPipeline');
      myRoom.participants = {};
    } else {
      socket.join(roomName);
    }
    return myRoom;
  }
}
