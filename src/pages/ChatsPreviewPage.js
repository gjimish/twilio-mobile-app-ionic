import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { matchSorter } from 'match-sorter';
import {
  IonButton,
  IonCheckbox,
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
    showLeads: true,
    showContacts: true,
    showDeals: false,
    showCustomModules: false,
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
          <IonItem lines="none">
            <IonLabel position="start">Contacts</IonLabel>
            <IonCheckbox
              checked={conversationsFilter.showContacts}
              name="Contacts"
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  showContacts: e.detail.checked
                }));
              }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Leads</IonLabel>
            <IonCheckbox
              checked={conversationsFilter.showLeads}
              name="Leads"
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  showLeads: e.detail.checked
                }));
              }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Deals</IonLabel>
            <IonCheckbox
              checked={conversationsFilter.showDeals}
              name="Deals"
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  showDeals: e.detail.checked
                }));
              }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Custom Modules</IonLabel>
            <IonCheckbox
              checked={conversationsFilter.showCustomModules}
              name="CustomModules"
              onIonChange={(e) => {
                setConversationsFilter((prevState) => ({
                  ...prevState,
                  showCustomModules: e.detail.checked
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
                (conversationsFilter.showContacts &&
                  message.crm_module_name == 'Contacts') ||
                (conversationsFilter.showLeads &&
                  message.crm_module_name == 'Leads') ||
                (conversationsFilter.showDeals &&
                  message.crm_module_name == 'Deals') ||
                (conversationsFilter.showCustomModules &&
                  message.crm_module_name != 'Deals' &&
                  message.crm_module_name != 'Leads' &&
                  message.crm_module_name != 'Contacts')
              ) {
                return (
                  <ChatsRowItem
                    message={message}
                    key={message.recent_message.contact_id}
                  />
                );
              }
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChatsPage;
