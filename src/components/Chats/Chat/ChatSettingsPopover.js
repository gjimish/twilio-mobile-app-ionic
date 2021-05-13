import {
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const ChatSettingsPopover = (props) => {
  const {
    toNumber,
    setToNumber,
    toNumbers,
    fromNumber,
    setFromNumber,
    fromNumbers,
    deliveryMethods,
    deliveryMethod,
    setDeliveryMethod,
    popoverState,
    setShowPopover
  } = props;

  return (
    <IonPopover
      event={popoverState.event}
      isOpen={popoverState.showPopover}
      onDidDismiss={() =>
        setShowPopover({ showPopover: false, event: undefined })
      }>
      <IonList>
        <IonItem lines="none">
          <IonLabel position="floating">Sending to</IonLabel>
          <IonSelect
            value={toNumber}
            placeholder={toNumber}
            onIonChange={(e) => setToNumber(e.detail.value)}>
            {toNumbers.map((toNumberOption) => {
              return (
                <IonSelectOption
                  value={toNumberOption.to_number}
                  key={toNumberOption.to_number}>
                  {toNumberOption.to_number}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem lines="none" style={{ paddingTop: '20px' }}>
          <IonLabel position="floating">Sending from</IonLabel>
          <IonSelect
            value={fromNumber}
            placeholder={fromNumber}
            onIonChange={(e) => setFromNumber(e.detail.value)}>
            {fromNumbers.map((fromNumberOption) => {
              return (
                <IonSelectOption
                  value={fromNumberOption.twilio_number}
                  key={fromNumberOption.twilio_number}>
                  {fromNumberOption.twilio_number}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem
          lines="none"
          style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <IonLabel position="floating">Delivery Method</IonLabel>
          <IonSelect
            value={deliveryMethod}
            placeholder={deliveryMethod}
            onIonChange={(e) => setDeliveryMethod(e.detail.value)}>
            {deliveryMethods.map((deliveryMethodOption) => {
              return (
                <IonSelectOption
                  value={deliveryMethodOption.value}
                  key={deliveryMethodOption.value}>
                  {deliveryMethodOption.label}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
      </IonList>
    </IonPopover>
  );
};

export default ChatSettingsPopover;
