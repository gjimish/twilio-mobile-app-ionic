import { IonAvatar, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';

const ContactsSkeletons = (props) => {
  const { quantity, height } = props;

  var skeletons = [];
  for (var i = 0; i < quantity; i++) {
    skeletons.push(
      <IonItem lines="none" key={i} className="message-item">
        <IonAvatar slot="start">
          <IonSkeletonText animated />
        </IonAvatar>
        <IonLabel className="contact-details">
          <IonSkeletonText animated style={{ height: `${height}px` }} />
        </IonLabel>
      </IonItem>
    );
  }
  return skeletons;
};

export default ContactsSkeletons;
