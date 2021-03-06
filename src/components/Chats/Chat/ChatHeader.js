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
import { useHistory } from 'react-router';
import ChatSettingsPopover from './ChatSettingsPopover';

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
  let history = useHistory();

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

  const makeCall = () => {
    // let callTo = Capacitor.getPlatform() == 'ios' ? { "to": toNumber } : toNumber
    // Twilio.TwilioVoiceClient.call(token, callTo);
    history.push(`/call/${toNumber}`);
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="" defaultHref="/Dashboard/chat"></IonBackButton>
        </IonButtons>
        <IonTitle mode="md" style={{ padding: 0, paddingLeft: Capacitor.getPlatform() === 'android' ? 0 : 10 }} >
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

          {/* {Capacitor.isNative && <IonButton
            fill="clear"
            size="small"
            onClick={makeCall}>
            <IonIcon size="large" icon={callOutline} />
          </IonButton>} */}

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
