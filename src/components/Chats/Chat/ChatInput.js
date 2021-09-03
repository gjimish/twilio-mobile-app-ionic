import {
  IonAlert,
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
  IonTextarea
} from '@ionic/react';
import { addCircleOutline, arrowUndoOutline, arrowUpOutline, attach, closeCircle, closeCircleOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { sendSMS } from '../../../actions/smsActions';
import ChatRepliesPopover from './ChatRepliesPopover';
import { useDispatch } from 'react-redux';
import { LOGOUT_SUCCESS } from '../../../actions/types';
import { v4 as uuidv4 } from 'uuid';

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

  const [imagePicker, showImagePicker] = useState(false);
  const [input, setInput] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [actionsPopoverState, setActionsPopover] = useState({
    showPopover: false,
    event: undefined
  });
  const dispatch = useDispatch();

  const [quickRepliesPopoverState, setShowQuickRepliesPopover] = useState({
    showQuickRepliesPopover: false,
    event: undefined
  });
  const moment = require('moment-timezone');

  const handleInputKeydown = (e) => {
    if (e.keyCode === ENTER_KEYCODE && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  const uploadImagesToCloudinary = async () => {
    setActionsPopover({ showPopover: false, event: undefined })

    // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()

    const uploads = selectedImages.map(async (image) => {
      // our formdata
      const formData = new FormData();
      formData.append('file', image);
      formData.append('tags', 'twilio');
      formData.append('upload_preset', 'twilio');
      formData.append('api_key', '173952541553444');
      formData.append('timestamp', Date.now().toString());

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/lktvgsltz/upload', {
          method: 'POST',
          body: formData
        })

        let jsonRes = await response.json()
        return jsonRes.url
      } catch (err) {
        console.log(err)
      }
    });

    let showImages = []

    for (let i = 0; i < selectedImages.length; i++) {
      showImages.push(URL.createObjectURL(selectedImages[i]))
    }

    setMessages((messages) => [
      ...messages,
      {
        body: "",
        created_at: moment(),
        direction: 'outbound',
        mms_content: JSON.stringify(showImages),
        send_from: fromNumber,
        send_to: toNumber || contact.number,
        isSending: true
      }
    ]);
    setSelectedImages([])

    let data = await Promise.all(uploads)
    sendMessage(data)
  }

  const sendMessage = async (images = []) => {
    if (input !== '' || images.length > 0) {
      const to = toNumber || contact.number;
      const messageToSend = input;
      const tempMessages = messages;
      setInput('');
      setIsSendingMessage(true);
      // Optimistic adding the message to the screen with 'isSending' prop
      if (images.length == 0)
        setMessages((messages) => [
          ...messages,
          {
            body: messageToSend,
            created_at: moment(),
            direction: 'outbound',
            mms_content: JSON.stringify(images),
            send_from: fromNumber,
            send_to: toNumber || contact.number,
            isSending: true
          }
        ]);
      let data = {
        send_to: deliveryMethod === 'whatsapp' ? `whatsapp:${to}` : to,
        send_sms_text: messageToSend,
        contact_id: contact.id,
        messageUUID: uuidv4(),
        image_urls: images,
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

  async function handleUploadImages(e) {
    let inputImages = []
    for (let i = 0; i < e.target.files.length; i++) {
      inputImages.push(e.target.files[i])
    }
    setSelectedImages(inputImages)
    setActionsPopover({ showPopover: false, event: undefined })
  };

  return (
    <div>
      {selectedImages.length > 0 && <IonRow>
        {selectedImages.map(item => {
          return <div style={{ height: 100, margin: 5, display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <img src={URL.createObjectURL(item)} style={{ height: 100 }} />
            </div>
            <IonIcon
              size="large"
              color='light'
              onClick={(e) => {
                setSelectedImages(items => items.filter(i => i != item))
              }}
              style={{ position: "absolute" }} icon={closeCircleOutline} />

          </div>
        })}
      </IonRow>}
      <IonRow
        className="ion-align-items-center"
        style={{
          padding: '10px 0px',
          '--border-radius': '20px',
          '--background': '#f5f5f5'
        }}>
        <input capture onChange={handleUploadImages} style={{ display: 'none' }} ref={cameraRef} accept={'image/*'} type="file" />
        <input multiple onChange={handleUploadImages} style={{ display: 'none' }} ref={galleryRef} accept={'image/*'} type="file" />

        <IonButton
          fill="clear"
          size="small"
          onClick={(e) => {
            setActionsPopover({ showPopover: true, event: e })
          }}>
          <IonIcon size="large" icon={addCircleOutline} />
        </IonButton>

        <IonCol>
          <div
            style={{
              padding: '10px 20px',
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
              }} />
          </div>
        </IonCol>

        <IonButton
          disabled={!(selectedImages.length != 0 || isLoading || input.trim() != '')}
          fill="clear"
          onClick={() => {
            if (selectedImages.length > 0)
              uploadImagesToCloudinary()
            else
              sendMessage()
          }}
          style={{
            '--border-radius': '999px',
          }}>
          <IonIcon
            color="primary"
            slot="icon-only"
            icon={arrowUpOutline} />
        </IonButton>

        <ChatRepliesPopover
          toNumber={toNumber}
          setToNumber={setToNumber}
          toNumbers={toNumbers}
          fromNumber={fromNumber}
          setFromNumber={setFromNumber}
          fromNumbers={fromNumbers}
          deliveryMethods={deliveryMethods}
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          popoverState={quickRepliesPopoverState}
          setShowPopover={setShowQuickRepliesPopover}
        />

        <IonPopover
          event={actionsPopoverState.event}
          isOpen={actionsPopoverState.showPopover}
          onDidDismiss={() =>
            setActionsPopover({ showPopover: false, event: undefined })
          }>
          <IonList>
            <IonItem onClick={() => {
              showImagePicker(true)
            }}>
              <IonLabel>Attachment</IonLabel>
              <IonIcon size="large" icon={attach} />
            </IonItem>
            {/* <IonItem onClick={(e) => { setShowQuickRepliesPopover({ showQuickRepliesPopover: true, event: e }); }}>
            <IonLabel>Quick Reply</IonLabel>
            <IonIcon size="large" icon={arrowUndoOutline} />
          </IonItem> */}
          </IonList>
        </IonPopover>

        <IonAlert
          isOpen={!!errorMessage}
          onDidDismiss={() => {
            setErrorMessage('');
          }}
          header={'Sending SMS Error'}
          message={errorMessage + "<br /><br /> Quite often these errors are resolved by logging out and logging back in."}
          buttons={[
            {
              text: 'Logout',
              handler: () => {
                dispatch({
                  type: LOGOUT_SUCCESS
                });
              }
            }, {
              text: 'Ignore error',
              handler: () => {
                setErrorMessage('');
              }
            },
          ]}
        />
        <IonAlert
          isOpen={imagePicker}
          onDidDismiss={() => showImagePicker(false)}
          header={'Choose image from'}
          buttons={[
            {
              text: 'Camera',
              handler: () => {
                showImagePicker(false)
                cameraRef.current.click()
              }
            },
            {
              text: 'Gallery',
              handler: () => {
                showImagePicker(false)
                galleryRef.current.click()
              }
            }
          ]}
        />
      </IonRow >
    </div >
  );
};

export default ChatInput;
