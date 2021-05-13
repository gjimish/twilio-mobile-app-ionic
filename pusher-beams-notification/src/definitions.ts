declare module '@capacitor/core' {
  interface PluginRegistry {
    PusherBeamNotification: PusherBeamNotificationPlugin;
  }
}

export interface PusherBeamNotificationPlugin {
  clientInit(options: { instanceId: string });
  addDeviceInterest(options: { interestName: string });
  addUser(options: { userId: number, token: string });
  clearState(options?: any);
}
