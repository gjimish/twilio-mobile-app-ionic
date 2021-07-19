import {
    IonBackButton,
    IonButton, IonButtons, IonContent,
    IonHeader,
    IonInput,
    IonItem, IonLabel, IonPage,
    IonText, IonTextarea, IonTitle,
    IonToolbar
} from '@ionic/react';
import { useState } from 'react';

const EditQuickReply = () => {
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
                <IonButton class="ion-margin" expand="block">Update</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default EditQuickReply;
