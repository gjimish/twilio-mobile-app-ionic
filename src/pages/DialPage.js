import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { add, backspace, call, callOutline, keypad } from 'ionicons/icons';
import { useState } from 'react';
import useLongPress from '../components/useLongPress';

const DialPage = () => {
    const [input, setInput] = useState('');
    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const onLongPress = () => {
        setInput('')
    };

    const onClick = () => {
        setInput(input.slice(0, input.length - 1))
    }

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    function append(n) {
        setInput(input + n)
    }

    function numButton(val, text) {
        return <IonCol size="3">
            <IonButton style={{ height: 45 }} expand="block" onClick={() => append(val)}>
                <IonCol >
                    <IonText style={{ fontSize: 20 }}>{val}</IonText>
                    <br />
                    <IonText style={{ fontSize: 8 }}>{text}</IonText>
                </IonCol>
            </IonButton>
        </IonCol>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/Dashboard/call"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Dial</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                <IonItem>
                    <IonInput
                        value={input}
                        readonly={true}
                        onIonChange={(e) => {
                            setInput(e.target.value);
                        }}
                        style={{ textAlign: 'center' }}
                        maxlength={20}
                        type='tel' />
                </IonItem>

                <IonCol size="1">
                    <IonRow className="ion-justify-content-evenly">
                        {numButton("1", "")}
                        {numButton("2", "ABC")}
                        {numButton("3", "DEF")}
                    </IonRow>
                    <IonRow className="ion-justify-content-evenly">
                        {numButton("4", "GHI")}
                        {numButton("5", "JKL")}
                        {numButton("6", "MNO")}
                    </IonRow>
                    <IonRow className="ion-justify-content-evenly">
                        {numButton("7", "PQRS")}
                        {numButton("8", "TUV")}
                        {numButton("9", "WXYZ")}
                    </IonRow>
                    <IonRow className="ion-justify-content-evenly">
                        <IonCol size="3">
                            <IonButton style={{ fontSize: 20, height: 45 }}
                                expand="block" fill="clear" onClick={() => append("*")}>&#8727;</IonButton>
                        </IonCol>
                        {numButton("0", "")}
                        <IonCol size="3">
                            <IonButton style={{ fontSize: 20, height: 45 }} expand="block"
                                fill='clear' onClick={() => append("#")}>#</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-evenly">
                        <IonCol size="3">
                            <IonButton expand="block" fill="clear"
                                onClick={() => append("+")}>
                                <IonIcon size="large" icon={add} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonButton fill="clear" expand="block">
                                <IonIcon size="large" icon={call} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonButton expand="block" fill="clear" {...longPressEvent}>
                                <IonIcon size="large" icon={backspace} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonContent>

        </IonPage>
    );
};

export default DialPage;
