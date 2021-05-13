import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router-dom';
const ContactPage = (props) => {
  //const { contact } = props;
  let { id } = useParams();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default ContactPage;
