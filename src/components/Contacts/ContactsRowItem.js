import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const ContactsRowItem = (props) => {
  const { contact } = props;
  let history = useHistory();
  return (
    <IonItem
      button
      lines="none"
      className="message-item"
      onClick={() => {
        history.push(`/chat/${contact.id}`);
      }}>
      <IonIcon className="avatar" icon={personCircleOutline} />
      <IonLabel className="contact-details">
        <h1>
          {contact.first_name} {contact.last_name}
        </h1>
      </IonLabel>

    </IonItem>
  );
};

export default ContactsRowItem;
