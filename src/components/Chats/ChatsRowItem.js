import { IonBadge, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import moment from 'moment';
import { useHistory } from 'react-router';

const ChatsRowItem = (props) => {
  let history = useHistory();
  return (
    <IonItem
      button
      lines="none"
      className="message-item"
      onClick={() => {
        history.push(`/chat/${props.message.id}`);
      }}>
      <IonIcon className="avatar" icon={personCircleOutline} />
      {<div className="online"></div>}

      <IonLabel className="contact-details">
        <h1>
          {props.message.first_name} {props.message.last_name}
        </h1>
        <IonBadge>{props.message.crm_module_name && props.message.crm_module_name.slice(0, -1)}</IonBadge>
        <p>{props.message.recent_message && props.message.recent_message.body != "null" && props.message.recent_message.body}</p>
      </IonLabel>

      <div className="stats">
        <p className="last-online">
          {props.message.recent_message && moment(props.message.recent_message.updated_at).calendar(null, {
            sameDay: 'h:mm A',
            lastDay: '[Yesterday]',
            lastWeek: 'dddd',
            sameElse: 'M/D/YY'
          })}
        </p>
        {/*props.message.new_message_count > 0 &&
                    <IonBadge color="primary">
                        {props.message.new_message_count}
                    </IonBadge>
                */}
      </div>
    </IonItem>
  );
};

export default ChatsRowItem;
