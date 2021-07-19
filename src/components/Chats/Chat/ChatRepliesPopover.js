import {
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router';

const ChatRepliesPopover = (props) => {
  const {
    quickRepliesList = ["test 1", "test 2", "test 3"],
    popoverState,
    setShowPopover
  } = props;
  let history = useHistory();

  return (
    <IonPopover
      event={popoverState.event}
      isOpen={popoverState.showQuickRepliesPopover}
      onDidDismiss={() =>
        setShowPopover({ showQuickRepliesPopover: false, event: undefined })
      }>
      <IonList>
        {quickRepliesList.map((item) => {
          return (
            <IonItem>
              <IonLabel position="">{item}</IonLabel>
              <IonButton onClick={() => {
                history.push(`/editreply`);
              }}>Edit</IonButton>
            </IonItem>
          )
        })}

      </IonList>
      <IonButton onClick={() => { history.push("/addreply") }} expand="block">+ Add a quick reply</IonButton>
    </IonPopover>
  );
};

export default ChatRepliesPopover;
