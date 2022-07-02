import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { tokenGetter } from 'src/app/app.module';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class ChatSocket extends Socket {
  constructor() {
    super({
      url: env.chatRoot,
      options: {
        extraHeaders: {
          Authorization: tokenGetter() as string,
        },
      },
    });
  }
}

// @Injectable()
// export class RtcSocket extends Socket {
//   constructor() {
//     super({
//       url: env.chatRoot,
//       options: {
//         extraHeaders: {
//           Authorization: tokenGetter() as string,
//         },
//       },
//     });
//   }
// }
