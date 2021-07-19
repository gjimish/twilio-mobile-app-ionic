import { useRef, useState } from 'react';
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonTextarea,
    IonLabel,
    IonInput,
    IonItem,
    IonButtons,
    IonBackButton,
    IonRow,
    IonButton,
    IonFooter,
    IonText
} from '@ionic/react';
import { keypad } from 'ionicons/icons';
import { useHistory } from 'react-router';
const ENTER_KEYCODE = 13;

const AddQuickReply = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Quick Replies</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonItem class="ion-margin-top">
                    <IonLabel position="stacked">Quick Reply Name</IonLabel>
                    <IonInput
                        value={name}
                        onIonChange={(e) => {
                            setName(e.target.value);
                        }} />
                </IonItem>

                <IonItem class="ion-margin-top">
                    <IonLabel position="stacked">Message</IonLabel>
                    <IonText class="ion-margin-top" style={{ fontSize: 10, marginTop: 10 }}>Press # to choose merge fields</IonText>
                    <IonTextarea
                        value={message}
                        type="text"
                        onIonChange={(e) => {
                            setMessage(e.target.value);
                        }} />
                </IonItem>
                <IonButton class="ion-margin" expand="block">Add</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AddQuickReply;
