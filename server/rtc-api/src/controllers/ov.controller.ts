import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { OpenVidu, OpenViduRole, Session } from 'openvidu-node-client';

@Controller('rtc')
export class OVController {
  OV: OpenVidu;
  // Collection to pair session names with OpenVidu Session objects
  mapSessions = {};
  // Collection to pair session names with tokens
  mapSessionNamesTokens = {};

  constructor() {
    this.OV = new OpenVidu(process.env.OV_URL, process.env.OPENVIDU_SECRET);
  }

  @Post('get-token')
  async getToken(@Body() body) {
    const sessionName = body.sessionName;
    const role = OpenViduRole.PUBLISHER;

    // Build connectionProperties object with PUBLISHER role
    var connectionProperties = {
      role: role,
    };
    if (this.mapSessions[sessionName]) {
      // Session already exists
      console.log('Existing session ' + sessionName);

      // Get the existing Session from the collection
      var mySession = this.mapSessions[sessionName];

      // Generate a new Connection asynchronously with the recently created connectionProperties
      try {
        const connection = mySession.createConnection(connectionProperties);
        // Store the new token in the collection of tokens
        this.mapSessionNamesTokens[sessionName].push(connection.token);
        // Return the token to the client
        return {
          0: connection.token,
        };
      } catch (error) {
        console.error(error);
        if (error.message === '404') {
          delete this.mapSessions[sessionName];
          delete this.mapSessionNamesTokens[sessionName];
          return this.newSession(sessionName, connectionProperties);
        }
      }
    } else {
      return this.newSession(sessionName, connectionProperties);
    }
  }

  async newSession(sessionName, connectionProperties) {
    console.log('New session ' + sessionName);
    // Create a new OpenVidu Session asynchronously
    try {
      const session: Session = await this.OV.createSession();
      // Store the new Session in the collection of Sessions
      this.mapSessions[sessionName] = session;
      // Store a new empty array in the collection of tokens
      this.mapSessionNamesTokens[sessionName] = [];
      // Generate a new connection asynchronously with the recently created connectionProperties
      const connection = await session.createConnection(connectionProperties);
      // Store the new token in the collection of tokens
      this.mapSessionNamesTokens[sessionName].push(connection.token);
      return {
        0: connection.token,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Post('remove-user')
  async removeUser(@Body() body) {
    const sessionName = body.sessionName;
    const token = body.token;
    // If the session exists
    if (
      this.mapSessions[sessionName] &&
      this.mapSessionNamesTokens[sessionName]
    ) {
      const tokens = this.mapSessionNamesTokens[sessionName];
      const index = tokens.indexOf(token);
      // If the token exists
      if (index !== -1) {
        // Token removed
        tokens.splice(index, 1);
        console.log(sessionName + ': ' + tokens.toString());
      } else {
        const msg = "Problems in the app server: the TOKEN wasn't valid";
        console.log(msg);
        throw new InternalServerErrorException(msg);
      }
      if (tokens.length == 0) {
        // Last user left: session must be removed
        console.log(sessionName + ' empty!');
        delete this.mapSessions[sessionName];
      }
      return 'ok';
    } else {
      const msg = 'Problems in the app server: the SESSION does not exist';
      console.log(msg);
      throw new InternalServerErrorException(msg);
    }
  }

  @Delete('close-session')
  async closeSession(@Body() body) {
    // Retrieve params from POST body
    const sessionName = body.sessionName;
    console.log('Closing session | {sessionName}=' + sessionName);

    // If the session exists
    if (this.mapSessions[sessionName]) {
      const session = this.mapSessions[sessionName];
      session.close();
      delete this.mapSessions[sessionName];
      delete this.mapSessionNamesTokens[sessionName];
      return 'ok';
    } else {
      var msg = 'Problems in the app server: the SESSION does not exist';
      console.log(msg);
      throw new InternalServerErrorException(msg);
    }
  }

  @Post('fetch-info')
  async fetchInfo(@Body() body) {
    // Retrieve params from POST body
    const sessionName = body.sessionName;
    console.log('Fetching session info | {sessionName}=' + sessionName);
    // If the session exists
    if (this.mapSessions[sessionName]) {
      try {
        const changed = this.mapSessions[sessionName].fetch();
        console.log('Any change: ' + changed);
        return this.sessionToJson(this.mapSessions[sessionName]);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      var msg = 'Problems in the app server: the SESSION does not exist';
      console.log(msg);
      throw new InternalServerErrorException(msg);
    }
  }

  @Get('fetch-all')
  async fetchAll() {
    console.log('Fetching all session info');
    try {
      const changed = this.OV.fetch();
      var sessions = [];
      this.OV.activeSessions.forEach((s) => {
        sessions.push(this.sessionToJson(s));
      });
      console.log('Any change: ' + changed);
      return sessions;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('force-disconnect')
  async forceDissconnect(@Body() body) {
    const sessionName = body.sessionName;
    const connectionId = body.connectionId;
    if (this.mapSessions[sessionName]) {
      try {
        const ok = await this.mapSessions[sessionName].forceDisconnect(
          connectionId,
        );
        return 'ok';
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      var msg = 'Problems in the app server: the SESSION does not exist';
      console.log(msg);
      throw new InternalServerErrorException(msg);
    }
  }

  @Delete('force-unpublish')
  async forceUnpublich(@Body() body) {
    // Retrieve params from POST body
    var sessionName = body.sessionName;
    var streamId = body.streamId;
    // If the session exists
    if (this.mapSessions[sessionName]) {
      try {
        const ok = await this.mapSessions[sessionName].forceUnpublish(streamId);
        return 'ok';
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      var msg = 'Problems in the app server: the SESSION does not exist';
      console.log(msg);
      throw new InternalServerErrorException(msg);
    }
  }

  sessionToJson(session) {
    var json: any = {};
    json.sessionId = session.sessionId;
    json.createdAt = session.createdAt;
    json.customSessionId = !!session.properties.customSessionId
      ? session.properties.customSessionId
      : '';
    json.recording = session.recording;
    json.mediaMode = session.properties.mediaMode;
    json.recordingMode = session.properties.recordingMode;
    json.defaultRecordingProperties =
      session.properties.defaultRecordingProperties;
    var connections: any = {};
    connections.numberOfElements = session.activeConnections.length;
    var jsonArrayConnections = [];
    session.activeConnections.forEach((con) => {
      var c: any = {};
      c.connectionId = con.connectionId;
      c.createdAt = con.createdAt;
      c.role = con.role;
      c.serverData = con.serverData;
      c.record = con.record;
      c.token = con.token;
      c.clientData = con.clientData;
      var pubs = [];
      con.publishers.forEach((p) => {
        const jsonP: any = {};
        jsonP.streamId = p.streamId;
        jsonP.createdAt = p.createdAt;
        jsonP.hasAudio = p.hasAudio;
        jsonP.hasVideo = p.hasVideo;
        jsonP.audioActive = p.audioActive;
        jsonP.videoActive = p.videoActive;
        jsonP.frameRate = p.frameRate;
        jsonP.typeOfVideo = p.typeOfVideo;
        jsonP.videoDimensions = p.videoDimensions;
        pubs.push(jsonP);
      });
      var subs = [];
      con.subscribers.forEach((s) => {
        subs.push(s);
      });
      c.publishers = pubs;
      c.subscribers = subs;
      jsonArrayConnections.push(c);
    });
    connections.content = jsonArrayConnections;
    json.connections = connections;
    return json;
  }

  // recording handlers start
  @Post('recording/start')
  async startRecord(@Body() body) {
    var recordingProperties = {
      outputMode: body.outputMode,
      hasAudio: body.hasAudio,
      hasVideo: body.hasVideo,
    };
    var sessionId = body.session;
    console.log('Starting recording | {sessionId}=' + sessionId);

    try {
      const recording = await this.OV.startRecording(
        sessionId,
        recordingProperties,
      );
      return recording;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('recording/stop')
  async stopRecord(@Body() body) {
    var recordingId = body.recording;
    console.log('Stopping recording | {recordingId}=' + recordingId);

    try {
      const recording = await this.OV.stopRecording(recordingId);
      return recording;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('recording/delete')
  async deleteRecord(@Body() body) {
    // Retrieve params from DELETE body
    var recordingId = body.recording;
    console.log('Deleting recording | {recordingId}=' + recordingId);

    try {
      const ok = await this.OV.deleteRecording(recordingId);
      return 'ok';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('recording/get/:recordingId')
  async getVideo(@Param('recordingId') recordingId) {
    // Retrieve params from GET url
    var recordingId = recordingId;
    console.log('Getting recording | {recordingId}=' + recordingId);

    try {
      const recording = await this.OV.getRecording(recordingId);
      return recording;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('recording/list')
  async getRecordList() {
    console.log('Listing recordings');
    try {
      const recordings = await this.OV.listRecordings();
      return recordings;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // recording handlers end
}
