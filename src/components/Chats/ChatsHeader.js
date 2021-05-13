import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonActionSheet
} from '@ionic/react';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../actions/authActions';

const ChatsHeader = (props) => {
  const [present] = useIonActionSheet();
  let history = useHistory();
  const actionSheet = {
    buttons: [
      {
        text: 'Logout',
        role: 'destructive',
        handler: () => {
          logout();
          history.push('/Login');
          console.log('Logging Out');
        }
      },
      { text: 'Cancel', role: 'cancel' }
    ]
  };
  const logout = () => {
    props.logout();
  };
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton onClick={() => present(actionSheet)}>
            <IonIcon slot="icon-only" icon={ellipsisVerticalOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>Messages</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(ChatsHeader);
