import { WebPlugin } from '@capacitor/core';
import { PusherBeamNotificationPlugin } from './definitions';

export class PusherBeamNotificationWeb extends WebPlugin implements PusherBeamNotificationPlugin {
  constructor() {
    super({
      name: 'PusherBeamNotification',
      platforms: ['web'],
    });
  }

  async clientInit(options: { instanceId: string }) {
    console.log('clientInit options: ', options);
  }

  async addDeviceInterest(options: { interestName: string }) {
    console.log('addDeviceInterest options: ', options);
  }

  async addUser(options: { userId: number, token: string }) {
    console.log('addUser options: ', options);
  }

  async clearState(options?) {
    console.log('clearState');
  }

}

const PusherBeamNotification = new PusherBeamNotificationWeb();

export { PusherBeamNotification };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(PusherBeamNotification);
