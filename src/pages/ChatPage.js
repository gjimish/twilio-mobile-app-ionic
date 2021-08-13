import { IonIcon, IonPage, IonRow, IonText } from '@ionic/react';
import axios from 'axios';
import { addCircleOutline, alertCircleOutline } from 'ionicons/icons';
import uniqBy from 'lodash/uniqBy';
import Pusher from 'pusher-js';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { logOutIfRequestUnauthenticated } from '../actions/authActions';
import {
  fetchChatHistory,
  fetchFromNumbers,
  fetchToNumbers
} from '../actions/smsActions';
import ChatHeader from '../components/Chats/Chat/ChatHeader';
import ChatInput from '../components/Chats/Chat/ChatInput';
import ChatViewer from '../components/Chats/Chat/ChatViewer';

const deliveryMethods = [
  { label: 'SMS', value: 'sms' },
  { label: 'Whatsapp', value: 'whatsapp' }
];

function ChatPage() {
  let history = useHistory();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({});
  const [crmLink, setCrmLink] = useState('');
  const [toNumbers, setToNumbers] = useState([]);
  const [fromNumbers, setFromNumbers] = useState([]);
  const [fromNumber, setFromNumber] = useState(null);
  const [toNumber, setToNumber] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(
    deliveryMethods[0].value
  );
  const moment = require('moment-timezone');
  let { id } = useParams();
  //const reduxContact = useSelector(({ sms }) => sms.user); // TODO do we need to get the contact this way too??
  //const error = useSelector(({ error }) => error);
  const dispatch = useDispatch();

  const { data: chat, refetch: refetchChat } = useQuery(
    ['chatHistory', id],
    () => fetchChatHistory(id),
    {
      enabled: !!id
    }
  );

  const { data: fromNumbersData } = useQuery(
    ['fromNumbers', id],
    () => fetchFromNumbers(id),
    {
      enabled: !!id
    }
  );

  const { data: toNumbersData } = useQuery(
    ['toNumbers', id],
    () => fetchToNumbers(id),
    {
      enabled: !!id
    }
  );

  useEffect(() => {
    if (Array.isArray(fromNumbersData?.data?.fromNumbers)) {
      setFromNumbers(fromNumbersData.data.fromNumbers);
    }
  }, [fromNumbersData]);

  useEffect(() => {
    if (Array.isArray(toNumbersData?.data?.contactData)) {
      setToNumbers(toNumbersData.data.contactData);
    }
  }, [toNumbersData]);

  // Use the last message to determine TO and FROM number. If there is
  // no last message, use the first contact data found from the user
  useEffect(() => {
    if (fromNumbersData && toNumbersData && messages) {
      const lastMessage = messages.length
        ? messages[messages.length - 1]
        : null;
      if (lastMessage) {
        const from = lastMessage.send_from;
        const to = lastMessage.send_to;
        const whatsappMsg =
          from?.includes('whatsapp') || to?.includes('whatsapp');
        if (whatsappMsg) {
          setDeliveryMethod(deliveryMethods[1].value);
        }
        if (lastMessage.direction === 'outbound') {
          setFromNumber(from.replace('whatsapp:', ''));
          setToNumber(to.replace('whatsapp:', ''));
        }

        if (lastMessage.direction === 'inbound') {
          setToNumber(from.replace('whatsapp:', ''));
          setFromNumber(to.replace('whatsapp:', ''));
        }
      } else {
        setToNumber(toNumbersData.data.contactData?.[0]?.to_number);
        setFromNumber(fromNumbersData.data.fromNumbers?.[0]?.twilio_number);
      }
    }
  }, [messages, fromNumbersData, toNumbersData]);

  const sortChat = useCallback((chat) => {
    return chat?.sort((date1, date2) => {
      const dateA = new Date(date1.created_at);
      const dateB = new Date(date2.created_at);
      return dateA.valueOf() - dateB.valueOf();
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('0f860d00d0bd2d8f3e73', {
      cluster: 'us2'
    });
    const channel = pusher.subscribe('incomming-channel');
    channel.bind('chat-event', (data) => {
      if (id && data.contact_id === parseInt(id)) {
        setMessages((currentMessages) => {
          const isExistingMessage = currentMessages.filter(
            (message) => message.sms_sid === data.smsSid
          );
          if (isExistingMessage.length) {
            return currentMessages;
          }
          return sortChat([
            ...currentMessages,
            {
              sms_sid: data.smsSid,
              user_id: data.user_id,
              contact_id: data.contact_id,
              body: data.message,
              created_at: moment().format('LLLL'),
              direction: 'inbound',
              send_from: data.From,
              send_to: data.To
            }
          ]);
        });
      }
    });
  }, [moment, sortChat, id]);

  useEffect(() => {
    if (chat?.data) {
      const data = chat.data;
      const sortedChat = sortChat(uniqBy(data.chat, 'sms_sid'));
      setMessages(sortedChat);
      setContact(data.user);
      setCrmLink(data.crm_link);
      setIsLoading(false);
    }
  }, [dispatch, chat, id, sortChat]);

  const onClose = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const payload = {
      zoho_contact_id: contact.zoho_contact_id
    };

    const body = JSON.stringify(payload);

    axios
      .post('/api/mark-conversation-closed', body, config)
      .then((res) => {
        history.goBack();
      })
      .catch((err) => {
        console.log(err.response.data);
        logOutIfRequestUnauthenticated(err, dispatch)
      });
  };
  /*
  useEffect(() => {
    if (error.id === 'SEND_SMS_FAIL') {
      toast.error(error.msg.msg, {
        containerId: 'B',
        transition: Zoom
      });

      dispatch(clearErrors());
    }
    if (error.noError) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  */
  return (
    <IonPage>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100vh',
          backgroundColor: 'white'
        }}>
        <ChatHeader
          contact={contact}
          isLoading={isLoading}
          crmLink={crmLink}
          toNumber={toNumber}
          onClose={onClose}
          messages={messages}
          fromNumber={fromNumber}
          setFromNumber={setFromNumber}
          fromNumbers={fromNumbers}
          setToNumber={setToNumber}
          toNumbers={toNumbers}
          setDeliveryMethod={setDeliveryMethod}
          deliveryMethod={deliveryMethod}
          deliveryMethods={deliveryMethods}
        />
        <ChatViewer messages={messages} isLoading={isLoading} />
        {fromNumbers.length == 0 && !isLoading ? <div style={{
          backgroundColor: '#ffcc0066', padding: 10,
          display: 'flex', flexDirection: 'row'
        }}>
          <IonIcon icon={alertCircleOutline} style={{ marginRight: 10 }} />
          <IonText style={{ fontSize: 14, flex: 1 }}>
            You can't send messages as you don't have access to any Twilio from numbers.
            Please ask your administrator to grant access to a from number in the CRM.</IonText>
        </div> :
          <ChatInput
            isLoading={isLoading}
            setMessages={setMessages}
            contact={contact}
            messages={messages}
            toNumber={toNumber}
            fromNumber={fromNumber}
            setFromNumber={setFromNumber}
            fromNumbers={fromNumbers}
            setToNumber={setToNumber}
            toNumbers={toNumbers}
            setDeliveryMethod={setDeliveryMethod}
            deliveryMethod={deliveryMethod}
            deliveryMethods={deliveryMethods}
            refetchChat={refetchChat}
          />
        }
      </div >
    </IonPage >
  );
}

export default ChatPage;
