import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { matchSorter } from 'match-sorter';
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import ChatsRowItem from '../components/Chats/ChatsRowItem';
import ChatsHeader from '../components/Chats/ChatsHeader';
import PullToRefresh from '../components/PullToRefresh';
import ItemRowSkeleton from '../components/ItemRowSkeletons';
import { fetchRecentConversations } from '../actions/smsActions';
import { filterOutline } from 'ionicons/icons';
import './Popover.css';

const ChatsPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined
  });
  const [conversationsFilter, setConversationsFilter] = useState({
    filterMode: 'unreplied',
    perPage: 20,
    pageNum: 1,
    newestFirst: true
  });
  const { data: dashboardData, refetch: refetchChats } = useQuery(
    ['conversationsQuery', conversationsFilter],
    fetchRecentConversations
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      const recordsFiltered = matchSorter(
        dashboardData?.data?.contacts ?? [],
        e.target.value,
        {
          keys: ['first_name', 'last_name', 'recent_message.send_from']
        }
      );
      setMessages(recordsFiltered);
    } else {
      setMessages(dashboardData?.data?.contacts ?? []);
    }
  };

  const handleRefresh = async (e) => {
    return new Promise((resolve) => {
      refetchChats().then(() => {
        resolve();
      });
    });
  };

  useEffect(() => {
    if (dashboardData?.data?.contacts) {
      setMessages(dashboardData.data.contacts);
    }
  }, [dashboardData]);

  useEffect(() => {
    if (dashboardData) {
      setIsLoading(false);
    }
  }, [dashboardData]);

  return (
    <IonPage>
      <ChatsHeader />
      <IonContent fullscreen>
        <PullToRefresh handleRefresh={handleRefresh} />
        {/* This shrinks the header on iphone */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Messages</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonSearchbar onIonChange={handleSearchInputChange}></IonSearchbar>
          </IonCol>
          <IonButton
            color="light"
            onClick={(e) => {
              setShowPopover({ showPopover: true, event: e });
            }}
            style={{
              '--border-radius': '999px',
              paddingRight: '10px'
            }}>
            <IonIcon icon={filterOutline} color="primary" slot="icon-only" />
          </IonButton>
        </IonRow>
        <IonPopover
          cssClass="contact-popover"
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() =>
            setShowPopover({ showPopover: false, event: undefined })
          }>
          <IonItem lines="none">
            <IonSegment
              value={conversationsFilter.filterMode}
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  filterMode: e.detail.value
                }));
              }}>
              <IonSegmentButton value="most-recently-touched">
                <IonLabel>no filter</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="unreplied">
                <IonLabel>reply</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="follow-up">
                <IonLabel>follow up</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          <IonItem lines="none">
            <IonSegment
              value={conversationsFilter.filterMode}
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  filterMode: e.detail.value
                }));
              }}>
              <IonSegmentButton value="Leads">
                <IonLabel>leads</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Contacts">
                <IonLabel>contacts</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Show newest first</IonLabel>
            <IonToggle
              checked={conversationsFilter.newestFirst}
              name="newestFirst"
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  newestFirst: e.detail.checked
                }));
              }}
            />
          </IonItem>
        </IonPopover>
        {isLoading ? (
          <ItemRowSkeleton quantity={9} height={20} />
        ) : (
          <IonList>
            {messages.map((message) => {
              if (
                conversationsFilter.filterMode == 'Leads' ||
                conversationsFilter.filterMode == 'Contacts'
              ) {
                console.log(message.crm_module_name);
                if (conversationsFilter.filterMode == message.crm_module_name)
                  return (
                    <ChatsRowItem
                      message={message}
                      key={message.recent_message.contact_id}
                    />
                  );
              } else
                return (
                  <ChatsRowItem
                    message={message}
                    key={message.recent_message.contact_id}
                  />
                );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChatsPage;
