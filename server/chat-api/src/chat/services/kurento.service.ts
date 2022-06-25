import { Injectable } from '@nestjs/common';
import * as kurento from 'kurento-client';
import { Socket } from 'socket.io';
@Injectable()
export class KurentoService {
  candidatesQueue = {};
  sessions = {};
  kurentoCleint: kurento.ClientInstance;
  constructor() {
    this.getKurentoClient();
  }

  async getKurentoClient() {
    this.kurentoCleint = await kurento(process.env.KURENTO_URL, {});
    console.log('kurento client', this.kurentoCleint);
  }

  async createMediaPipeLine(socket: Socket, data: any) {
    const pipeLine = await this.kurentoCleint.create('MediaPipeline');
    const webRtcEndPoint = await pipeLine.create('WebRtcEndpoint');

    if (this.candidatesQueue[socket.data.user]) {
      while (this.candidatesQueue[socket.data.user].length) {
        var candidate = this.candidatesQueue[socket.data.user].shift();
        webRtcEndPoint.addIceCandidate(candidate);
      }
    }
    const connectedEndPoint = await webRtcEndPoint.connect(webRtcEndPoint);
    webRtcEndPoint.on('OnIceCandidate', function (event) {
      const candidate = kurento.getComplexType('IceCandidate')(event.candidate);
    });
    this.sendToBrowser(socket, 'newIceCandidate', candidate);

    const sdpAnswer = await webRtcEndPoint.processOffer(data.sdpOffer);
    if (sdpAnswer) {
      this.sessions[socket.data.user] = {
        pipeLine,
        webRtcEndPoint,
      };
    }
    webRtcEndPoint.gatherCandidates();
    console.log(this.candidatesQueue);
    console.log('===============================================');
    console.log(this.sessions);
  }

  async sendToBrowser(socket: Socket, eventName: string, data: any) {
    socket.emit(eventName, data);
  }

  stop(socket: Socket) {
    if (this.sessions[socket.data.user]) {
      var pipeline = this.sessions[socket.data.user].pipeline;
      console.info('Releasing pipeline');
      pipeline.release();

      delete this.sessions[socket.data.user];
      delete this.candidatesQueue[socket.data.user];
    }
  }

  onIceCandidate(socket: Socket, data: any) {
    var candidate = kurento.getComplexType('IceCandidate')(data.candidate);

    if (this.sessions[socket.data.user]) {
      console.info('Sending candidate');
      var webRtcEndpoint = this.sessions[socket.data.user].webRtcEndpoint;
      webRtcEndpoint.addIceCandidate(candidate);
    } else {
      console.info('Queueing candidate');
      if (!this.candidatesQueue[socket.data.user]) {
        this.candidatesQueue[socket.data.user] = [];
      }
      this.candidatesQueue[socket.data.user].push(candidate);
    }
  }
}
