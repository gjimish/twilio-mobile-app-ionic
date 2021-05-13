import { useState } from 'react';
import { sendSMS } from '../../../actions/smsActions';
import {
  IonAlert,
  IonButton,
  IonCol,
  IonIcon,
  IonRow,
  IonTextarea
} from '@ionic/react';
import { arrowUpOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import ChatSettingsPopover from './ChatSettingsPopover';

const ENTER_KEYCODE = 13;

const ChatInput = (props) => {
  const {
    contact,
    messages,
    setMessages,
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
    refetchChat
  } = props;

  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined
  });
  const moment = require('moment-timezone');

  const handleInputKeydown = (e) => {
    if (e.keyCode === ENTER_KEYCODE && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (input !== '') {
      const to = toNumber || contact.number;
      const messageToSend = input;
      const tempMessages = messages;
      setInput('');
      setIsSendingMessage(true);
      // Optimistic adding the message to the screen with 'isSending' prop
      setMessages((messages) => [
        ...messages,
        {
          body: messageToSend,
          created_at: moment(),
          direction: 'outbound',
          send_from: fromNumber,
          send_to: toNumber || contact.number,
          isSending: true
        }
      ]);
      let data = {
        send_to: deliveryMethod === 'whatsapp' ? `whatsapp:${to}` : to,
        send_sms_text: messageToSend,
        contact_id: contact.id,
        from_number:
          deliveryMethod === 'whatsapp' ? `whatsapp:${fromNumber}` : fromNumber
      };
      const response = await sendSMS(data);
      if (response?.success) {
        refetchChat()
      } else {
        // Remove the optimistly added message
        setMessages(() => [...tempMessages]);
        setErrorMessage(response?.msg);
      }
      setIsSendingMessage(false);
    }
  };

  return (
    <IonRow
      style={{
        padding: '10px 20px',
        //borderTop: '1px solid lightgray',
        '--border-radius': '20px',
        '--background': '#f5f5f5'
      }}>
      <IonCol>
        <div
          style={{
            padding: '10px 20px',
            //borderTop: '1px solid lightgray',
            borderRadius: '20px',
            background: '#f5f5f5'
          }}>
          <IonTextarea
            rows="2"
            value={input}
            placeholder="SMS Message"
            type="text"
            onKeyDown={handleInputKeydown}
            onIonChange={(e) => {
              setInput(e.target.value);
            }}></IonTextarea>
        </div>
      </IonCol>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        {input.trim() === '' ? (
          <IonButton
            fill="clear"
            onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}>
            <IonIcon size="large" icon={ellipsisVerticalOutline} />
          </IonButton>
        ) : (
          <IonButton
            disabled={isLoading || input.trim() === ''}
            onClick={sendMessage}
            style={{
              '--border-radius': '999px',
              marginRight: 'auto',
              marginLeft: '10px',
              float: 'right'
            }}>
            <IonIcon
              color="primary"
              slot="icon-only"
              icon={arrowUpOutline}></IonIcon>
          </IonButton>
        )}
      </div>
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
      <IonAlert
        isOpen={!!errorMessage}
        onDidDismiss={() => {
          setErrorMessage('');
        }}
        header={'Sending SMS Error'}
        message={errorMessage}
        buttons={[
          {
            text: 'Ok',
            handler: () => {
              setErrorMessage('');
            }
          }
        ]}
      />
    </IonRow>
  );
};

export default ChatInput;
