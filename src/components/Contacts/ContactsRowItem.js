import { IonBadge, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const ContactsRowItem = (props) => {
  const { contact, query } = props;
  let history = useHistory();

  function getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { backgroundColor: 'yellow' }
                : {}
            }>
            {part}
          </span>
        ))}
      </span>
    );
  }

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
          {getHighlightedText(
            `${contact.first_name} ${contact.last_name}`,
            query
          )}
        </h1>
        {contact.email && <div>{getHighlightedText(contact.email, query)}</div>}
      </IonLabel>
      <IonBadge>{contact.type.slice(0, -1)}</IonBadge>
    </IonItem>
  );
};

export default ContactsRowItem;
