import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner
} from '@ionic/react';
import { checkmarkCircleOutline, logInOutline } from 'ionicons/icons';

const LoginCard = (props) => {
  const {
    isLoading,
    showSync,
    isContactsSyncing,
    isLeadsSyncing,
    isMessagesSyncing,
    onDoAuth
  } = props;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{isLoading ? 'Logging in...' : 'Login'}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {isLoading ? (
          <>
            {' '}
            <p style={{ fontSize: '16px' }}>
              Syncing Zoho account data. Please do not refresh or leave this
              page.
            </p>
          </>
        ) : (
          <div>
            <IonButton expand="block" size="large" onClick={onDoAuth}>
              Login
              <IonIcon icon={logInOutline} slot="end" />
            </IonButton>
            <p
              style={{
                textAlign: 'center'
              }}>
              Login with your Zoho CRM account
            </p>
          </div>
        )}
        {showSync && (
          <>
            <IonList lines="inset">
              <IonItem>
                <IonLabel>Syncing Contacts</IonLabel>
                {isContactsSyncing ? (
                  <IonSpinner color="primary" />
                ) : (
                  <IonIcon color="primary" icon={checkmarkCircleOutline} />
                )}
              </IonItem>
              <IonItem>
                <IonLabel>Syncing Leads</IonLabel>
                {isLeadsSyncing ? (
                  <IonSpinner color="primary" />
                ) : (
                  <IonIcon color="primary" icon={checkmarkCircleOutline} />
                )}
              </IonItem>
              <IonItem>
                <IonLabel>Syncing Messages</IonLabel>
                {isMessagesSyncing ? (
                  <IonSpinner color="primary" />
                ) : (
                  <IonIcon color="primary" icon={checkmarkCircleOutline} />
                )}
              </IonItem>
            </IonList>
          </>
        )}
        <div
          style={{
            paddingTop: '20px',
            textAlign: 'center'
          }}>
          {isLoading && <IonSpinner color="primary" />}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginCard;
