import { IonIcon, IonSpinner, IonImg, IonModal, IonButton } from '@ionic/react';
import { checkmarkDoneOutline, closeCircle, closeCircleOutline } from 'ionicons/icons';
import { forwardRef, useState } from 'react';
import { safelyParseJSON } from '../../SafelyParseJson';
import './Message.css';

const Message = forwardRef(
  ({ contents: { created_at, direction, body, isSending, mms_content } }, ref) => {
    const [fullImageModal, showFullImage] = useState(false);
    const [image, setImage] = useState("");

    function showImage(image) {
      setImage(image)
      showFullImage(true)
    }

    if (mms_content) mms_content = safelyParseJSON(mms_content)

    return (
      <div
        ref={ref}
        style={{ marginBottom: '10px' }}
        className={`message ${direction === 'outbound' && 'message__sender'}`}>

        <IonModal
          isOpen={fullImageModal}
          swipeToClose={true}
          cssClass='fullscreen'
          onDidDismiss={() => showFullImage(false)}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ height: '90%', width: '90%', objectFit: 'contain' }} src={image} />
          </div>
          <IonButton
            fill="clear"
            size="small"
            style={{ position: 'absolute', right: 20, top: 20 }}
            onClick={() => {
              showFullImage(false)
            }}>
            <IonIcon size="large" icon={closeCircle} />
          </IonButton>

        </IonModal>

        <section>
          <div>
            {mms_content && mms_content instanceof Array && mms_content.length > 0 ?
              mms_content.map(image => {
                return <img
                  onClick={() => showImage(image)}
                  style={{ height: 200, marginLeft: 5 }} key={image} src={image} />
              })
              : <p>{body} </p>}
          </div>
          {direction === 'outbound' && (
            <div style={{ paddingLeft: '10px' }}>
              {isSending ? (
                <IonSpinner name="lines-small" />
              ) : (
                <IonIcon icon={checkmarkDoneOutline} />
              )}
            </div>
          )}
        </section>
        <small className={`message__date ${direction === 'outbound' && 'message__date__outbound'}`}>
          {new Date(Date.parse(created_at)).toLocaleString()}
        </small>
      </div>
    );
  }
);

export default Message;
