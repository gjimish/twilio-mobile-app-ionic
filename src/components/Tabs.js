import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet
} from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CallsPage from '../pages/ContactsPage';
import ContactsPage from '../pages/CallsPage';
import { callOutline, chatboxOutline, keypadOutline, peopleOutline } from 'ionicons/icons';
import ChatsPreviewPage from '../pages/ChatsPreviewPage';

const Tabs = (props) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/Dashboard/chat">
            <ChatsPreviewPage {...props} />
          </Route>
          <Route exact path="/Dashboard/contact">
            <CallsPage {...props} />
          </Route>
          <Route exact path="/Dashboard/call">
            <ContactsPage {...props} />
          </Route>
          <Redirect from="/Dashboard" exact to="/Dashboard/chat" />
        </Switch>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/Dashboard/chat">
          <IonIcon icon={chatboxOutline} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/Dashboard/contact">
          <IonIcon icon={peopleOutline} />
        </IonTabButton>
        {/* <IonTabButton tab="tab3" href="/Dashboard/call">
          <IonIcon icon={callOutline} />
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
