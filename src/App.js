import { useEffect } from 'react';
import { IonApp } from '@ionic/react';
import configureStore from './config/configureStore';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { Plugins, Capacitor } from '@capacitor/core';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import Routes from './Routes';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/custom-variables.css';

import { environment } from './environments/environment';

// TODO Do we really need axios here?
axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
});

const App = () => {
  const store = configureStore();
  const { PushNotifications } = Plugins;
  // Capacitor dependencies
  const { PusherBeamNotification } = Plugins;
  if (store.getState().auth.user) {
    ReactGA.initialize('UA-54758380-3');
    ReactGA.set({
      user_id: store.getState().auth.user.zoho_org_id
      // any data that is relevant to the user session
      // that you would like to track with google analytics
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      retry: 0
    }
  });

  useEffect(() => {
    // check platform is native
    if (Capacitor.isNative) {
      // initialize the pusher beam notification
      // PusherBeamNotification.clientInit({
      //  instanceId: environment.PUSHER_BEAM_INSTANCE_ID
      //});
      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notificationPayload) => {
          const notificationData =
            notificationPayload.notification &&
            notificationPayload.notification.data
              ? notificationPayload.notification.data
              : null;
          const dataPayload =
            notificationData && notificationData.notification
              ? JSON.parse(notificationData.notification)
              : null;
          if (dataPayload && dataPayload.deep_link) {
            const deepLink = dataPayload.deep_link;
            if (deepLink && deepLink !== '') {
              const deepLinkPath = new URL(deepLink).pathname;
              window.location = deepLinkPath;
            }
          }
        }
      );
    }
  });

  return (
    <IonApp>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </QueryClientProvider>
      </Provider>
    </IonApp>
  );
};

export default App;
