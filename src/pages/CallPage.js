import { Capacitor, Plugins } from '@capacitor/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CordovaPluginTwilioVoiceSdk } from '@ionic-native/cordova-plugin-twiliovoicesdk';
import {
    IonButton, IonCol, IonIcon, IonItem, IonInput,
    IonContent, IonPage, IonRow, IonText, IonTitle
} from '@ionic/react';
import axios from 'axios';
import { add, backspace, call, callOutline, keypad, keypadOutline, mic, micOff, micOffOutline, micOutline, volumeHighOutline, volumeMuteOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useLongPress from '../components/useLongPress';

const { LocalNotifications } = Plugins;

const CallPage = () => {
    const [input, setInput] = useState('');
    let history = useHistory();

    let { toNumber } = useParams();
    const TOKEN_URL = 'https://iosquickstart-9822-dev.twil.io/access-token?identity=netset'

    const [isSpeakerOn, setSpeaker] = useState(false);
    const [isMute, setMute] = useState(false);
    const [isDialpadOpen, setDialpadOpen] = useState(false);
    const [callStatus, setCallStatus] = useState("Calling...");

    let token = ""
    let cordovaTwilioSDkObject = CordovaPluginTwilioVoiceSdk.create();
    cordovaTwilioSDkObject.load();
    let Twilio = window.Twilio;

    useEffect(() => {
        async function doStuffAfterTwilioPluginLoaded() {
            // console.log(token)
            try {
                // permission stuff
                const androidPermissions = new AndroidPermissions();
                const result = await androidPermissions.checkPermission(androidPermissions.PERMISSION.RECORD_AUDIO);
                if (!result.hasPermission) {
                    await androidPermissions.requestPermissions([androidPermissions.PERMISSION.RECORD_AUDIO]);
                }
                // const resp = await axios.get(TOKEN_URL);
                // console.log("resp.data",resp.data);
                // setToken(resp.data);
                console.log(".laod");

                let response = await axios.get(TOKEN_URL)
                token = response.data

                // @ts-ignore
                if (!Twilio) {
                    console.log("No twilio");
                    throw new Error("Twilio plugin load failure");
                }

                Twilio.TwilioVoiceClient.initialize(token);

                Twilio.TwilioVoiceClient.clientinitialized(function (d) {
                    console.log("init success!");
                    makeCall()
                    //$('#statusMessage').text('Ready to start call');
                });

                // Accept or reject a call - only needed on Android - iOS uses CallKit

                Twilio.TwilioVoiceClient.callinvitereceived(function (call) {
                    alert("incoming");
                    LocalNotifications.schedule({
                        notifications: [
                            {
                                id: 1,
                                title: "title",
                                body: "body"
                            }
                        ],
                    });
                });


                // Handle Errors
                Twilio.TwilioVoiceClient.error(function (error) {
                    setCallStatus("Error While Connecting")
                    alert("error :- " + JSON.stringify(error))
                    history.goBack()
                });

                // Handle Call Connection
                Twilio.TwilioVoiceClient.calldidconnect(function (call) {
                    // $('#statusMessage').text("Successfully established call");
                    // $('#dialButton').toggle();
                    // $('#hangupButton').toggle();
                    setCallStatus("Connected")
                });

                // Handle Call Disconnect
                Twilio.TwilioVoiceClient.calldiddisconnect(function (call) {
                    // $('#statusMessage').text("Call ended");
                    // $('#dialButton').toggle();
                    // $('#hangupButton').toggle();
                    setCallStatus("Disconnected")
                    history.goBack()
                });

            } catch (e) {
                alert(e);
                setCallStatus("Error While Connecting")
                history.goBack()
            }
        }
        if (Capacitor.isNative)
            doStuffAfterTwilioPluginLoaded();
    }, []);

    const makeCall = () => {
        let callTo = Capacitor.getPlatform() == 'ios' ? { "to": toNumber } : toNumber
        Twilio.TwilioVoiceClient.call(token, callTo);
    }

    const endCall = () => {
        Twilio.TwilioVoiceClient.disconnect()
    }

    const toggleMute = () => {
        if (isMute)
            Twilio.TwilioVoiceClient.unmuteCall()
        else
            Twilio.TwilioVoiceClient.muteCall()
        setMute(!isMute)
    }

    const toggleSpeaker = () => {
        Twilio.TwilioVoiceClient.setSpeaker(isSpeakerOn ? "off" : "on")
        setSpeaker(!isSpeakerOn)
    }

    const toggleDialpad = () => {
        setDialpadOpen(!isDialpadOpen)
    }

    const sendDigit = (val) => {
        // setInput(val);
        let key = val.substring(val.length - 1, val.length)
        Twilio.TwilioVoiceClient.sendDigits(key)
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
        Twilio.TwilioVoiceClient.sendDigits(n)
    }

    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/Dashboard/call"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Call</IonTitle>
                </IonToolbar>
            </IonHeader> */}

            <IonContent fullscreen>
                <IonCol size="1">
                    <div style={{ fontSize: 24, fontWeight: 'bold' }} className="ion-text-center">{toNumber}</div>
                    <IonTitle style={{ marginTop: 10 }} className="ion-text-center">{callStatus}</IonTitle>
                </IonCol>

                {isDialpadOpen && <IonCol size="1">
                    <IonItem>
                        <IonCol size="3" />
                        <IonInput
                            value={input}
                            readonly={true}
                            style={{ textAlign: 'center', fontSize: 20 }}
                            maxlength={20}
                            type='tel' />
                        <IonCol size="3" style={{ width: 20 }}>
                            <IonButton expand="block" fill="clear" {...longPressEvent}>
                                <IonIcon size="large" icon={backspace} />
                            </IonButton>
                        </IonCol>
                    </IonItem>
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
                </IonCol>}


            </IonContent>

            <div className="ion-text-center">
                <IonButton fill="clear" style={{ height: 45 }} onClick={toggleMute} class="ion-margin ion-text-center">
                    <IonIcon size="large" icon={isMute ? micOffOutline : micOutline} />
                </IonButton>
                <IonButton fill="clear" style={{ height: 45 }} onClick={toggleDialpad} class="ion-margin ion-text-center">
                    <IonIcon size="large" icon={keypadOutline} />
                </IonButton>
                <IonButton fill="clear" style={{ height: 45 }} onClick={toggleSpeaker} class="ion-margin ion-text-center">
                    <IonIcon size="large" icon={isSpeakerOn ? volumeHighOutline : volumeMuteOutline} />
                </IonButton>
                <IonButton fill='solid' shape='round' style={{ height: 80 }} color={"danger"} onClick={endCall} class="ion-margin ion-text-center">
                    <IonIcon size="large" icon={callOutline} />
                </IonButton>
            </div>

        </IonPage>
    );
};

export default CallPage;
