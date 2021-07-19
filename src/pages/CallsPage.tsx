import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { keypad } from 'ionicons/icons';
import { useHistory } from 'react-router';

const CallsPage: React.FC = () => {
  let history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calls</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calls</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonFab onClick={() => { history.push(`/dial`); }}
          vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={keypad} />
          </IonFabButton>
        </IonFab>
      </IonContent>

    </IonPage>
  );
};

export default CallsPage;
