import { lazy, Suspense } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { ClimbingBoxLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import Tabs from './components/Tabs';
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';
import PushNotificationWrapper from './components/PushNotificationWrapper';
import DialPage from './pages/DialPage';
import AddQuickReply from './pages/AddQuickReply';
import EditQuickReply from './pages/EditQuickReply';

const Routes = () => {
  const LoginPage = lazy(() => import('./pages/LoginPage'));
  let isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
          </div>
        </div>
      </>
    );
  };

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {isAuthenticated ? (
            <>
              <PushNotificationWrapper />
              <Switch>
                <Redirect from="/Login" to="/Dashboard/chat" />
                <Redirect from="/" exact to="/Dashboard/chat" />
                <Route path="/Dashboard" render={() => <Tabs />} />
                <Route exact path="/chat/:id">
                  <ChatPage />
                </Route>
                <Route exact path="/contact/:id">
                  <ContactPage />
                </Route>
                <Route exact path="/dial">
                  <DialPage />
                </Route>
                <Route exact path="/addreply">
                  <AddQuickReply />
                </Route>
                <Route exact path="/editreply">
                  <EditQuickReply />
                </Route>
              </Switch>
            </>
          ) : (
            <>
              <Switch>
                <Route path="/Login/:auth_token?" component={LoginPage} />
                <Redirect from="/" to="/Login" />
                <Redirect from="" to="/Login" />
              </Switch>
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </Suspense>
  );
};

export default Routes;
