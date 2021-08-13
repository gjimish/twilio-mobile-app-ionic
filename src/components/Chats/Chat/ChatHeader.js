import { Capacitor } from '@capacitor/core';
import {
  IonBackButton,
  IonButton,
  IonButtons, IonHeader,
  IonIcon, IonLabel,
  IonPopover,
  IonSkeletonText, IonTitle, IonToolbar
} from '@ionic/react';
import { callOutline, checkmark, ellipsisVerticalOutline } from 'ionicons/icons';
import { useState } from 'react';
import ChatSettingsPopover from './ChatSettingsPopover';
// import { CordovaPluginTwilioVoiceSdk } from '@ionic-native/cordova-plugin-twiliovoicesdk'

const ChatHeader = (props) => {
  const {
    contact,
    crmLink,
    isLoading,
    toNumber,
    setToNumber,
    toNumbers,
    fromNumber,
    setFromNumber,
    fromNumbers,
    deliveryMethod,
    setDeliveryMethod,
    deliveryMethods,
    onClose
  } = props;

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2ZhYjcwMGIyNmM5MDI1ZWU5ODUwNTMzMmRhNTYwNzc1LTE2MjY0MTk0ODAiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJzZGZkc2Zkc2YiLCJ2b2ljZSI6eyJvdXRnb2luZyI6eyJhcHBsaWNhdGlvbl9zaWQiOiJBUDRjMTJlMGIzMmM1ZmY5MjQxMWQzOTRiMzJhZWNjYTg5In0sInB1c2hfY3JlZGVudGlhbF9zaWQiOiJDUjY1MTU2MzE0OGVhM2U3MjI5YjcyMzhmN2NiOGJjMmQ3In19LCJpYXQiOjE2MjY0MTk0ODAsImV4cCI6MTYyNjQyMzA4MCwiaXNzIjoiU0tmYWI3MDBiMjZjOTAyNWVlOTg1MDUzMzJkYTU2MDc3NSIsInN1YiI6IkFDYTkzZTc3N2FkZTBkMWNmM2Y4ZDliMWNhMTk0NDU1OTcifQ.wiqQDgkHBooesQ_MLcerhYTksEQMUQE6YwFh30kT0LE";
  const [target, setTarget] = useState('+917696290454');

  // let cordovaTwilioSDkObject = CordovaPluginTwilioVoiceSdk.create();
  // cordovaTwilioSDkObject.load();
  // let Twilio = window.Twilio;
  // if (!Twilio) {
  //   alert("No twilio");
  //   throw new Error("Twilio plugin load failure");
  // }
  // Twilio.TwilioVoiceClient.initialize(token);

  // Twilio.TwilioVoiceClient.clientinitialized(function () {
  //   console.log("init success!");
  //   alert("Ready to start call")
  //   //$('#statusMessage').text('Ready to start call');
  // });

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined
  });

  const [openZohoPopover, setOpenZohoPopover] = useState({
    showPopover: false,
    event: undefined
  });

  const handleCrmLink = (e) => {
    setOpenZohoPopover({ showPopover: true, event: e });
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="" defaultHref="/Dashboard/chat"></IonBackButton>
        </IonButtons>
        <IonTitle mode="md" style={{ paddingLeft: Capacitor.getPlatform() === 'android' ? 0 : 30, padding: 0 }} >
          {isLoading ? (
            <IonSkeletonText
              animated
              style={{
                height: '30px',
                width: '30%',
                borderRadius: '30px'
              }}
            />
          ) : (
            <>
              <a
                // href={crmLink}
                onClick={handleCrmLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}>
                {`${contact.first_name || ''} ${contact.last_name || ''}`}
              </a>
              <div style={{ fontSize: '11px' }}>{toNumber}</div>
            </>
          )}
        </IonTitle>
        <IonButtons slot="end" >

          <IonButton onClick={onClose} style={{ margin: 0 }}>
            <IonIcon style={{ height: 30, width: 30, }} icon={checkmark} />
            <IonLabel style={{ fontSize: 8 }}>No Reply<br />Needed</IonLabel>
          </IonButton>

          <IonButton
            fill="clear"
            size="small"
            onClick={() => { console.log(); }}>
            <IonIcon size="large" icon={callOutline} />
          </IonButton>

          <IonButton
            fill="clear"
            size="small"
            onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}>
            <IonIcon size="large" icon={ellipsisVerticalOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <ChatSettingsPopover
        toNumber={toNumber}
        setToNumber={setToNumber}
        toNumbers={toNumbers}
        fromNumber={fromNumber}
        setFromNumber={setFromNumber}
        fromNumbers={fromNumbers}
        deliveryMethods={deliveryMethods}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        popoverState={popoverState}
        setShowPopover={setShowPopover}
      />
      <IonPopover
        event={openZohoPopover.event}
        isOpen={openZohoPopover.showPopover}
        onDidDismiss={() =>
          setOpenZohoPopover({ showPopover: false, event: null })
        }>
        <IonButton onClick={() => {
          window.open(crmLink)
          setOpenZohoPopover({ showPopover: false, event: null });
        }} style={{ margin: 20 }}>
          Open In Zoho Crm
        </IonButton>
      </IonPopover>
    </IonHeader >
  );
};

export default ChatHeader;
