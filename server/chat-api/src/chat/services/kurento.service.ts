import { Injectable } from '@nestjs/common';
import * as kurento from 'kurento-client';
@Injectable()
export class KurentoService {
  kurentoCleint: kurento.ClientInstance;
  constructor() {
    this.getKurentoClient();
  }

  async getKurentoClient() {
    this.kurentoCleint = await kurento(process.env.KURENTO_URL, {});
  }
}
