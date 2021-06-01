import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonSkeletonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const ChatHeader = (props) => {
  const { contact, crmLink, toNumber, isLoading, onClose } = props;

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/Dashboard/chat"></IonBackButton>
        </IonButtons>
        <IonTitle>
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
                href={crmLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}>
                {`${contact.first_name || ''} ${contact.last_name || ''}`}
              </a>
              <div style={{ fontSize: '11px' }}>{toNumber}</div>
            </>
          )}
        </IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onClose}>Close</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default ChatHeader;
