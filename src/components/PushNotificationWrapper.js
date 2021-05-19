import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Capacitor, Plugins } from '@capacitor/core';
import { useSelector } from 'react-redux';

const PushNotificationWrapper = () => {
  const history = useHistory();
  const { PusherBeamNotification, PushNotifications } = Plugins;

  let user = useSelector(({ auth }) => auth.user);
  let isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  useEffect(() => {
    if (Capacitor.isNative && isAuthenticated) {
      let token = localStorage.getItem('token');
      // Initialize user for push notification
      PusherBeamNotification.addUser({
        userId: user.id,
        token
      });
      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notificationPayload) => {
          const notificationData =
            notificationPayload.notification &&
            notificationPayload.notification.data
              ? notificationPayload.notification.data
              : null;
          if (notificationData && notificationData.deep_link) {
            const deepLink = notificationData.deep_link;
            if (deepLink && deepLink !== '') {
              console.log(deepLink);
              history.push(`/${deepLink}`);
            }
          } else {
            console.log('Notification data or deeplink undefined.');
            console.log(notificationData.deep_link);
          }
        }
      );
    }
  });
  return <></>;
};
export default PushNotificationWrapper;
