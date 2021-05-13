import { IonIcon, IonSpinner } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { forwardRef } from 'react';
import './Message.css';

const Message = forwardRef(
  ({ contents: { created_at, direction, body, isSending } }, ref) => {
    return (
      <div
        ref={ref}
        style={{ marginBottom: '10px' }}
        className={`message ${direction === 'outbound' && 'message__sender'}`}>
        <section>
          <div>
            <p>{body} </p>
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
