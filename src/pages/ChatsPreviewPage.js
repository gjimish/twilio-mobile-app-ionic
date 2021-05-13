import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { matchSorter } from 'match-sorter';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import ChatsRowItem from '../components/Chats/ChatsRowItem';
import ChatsHeader from '../components/Chats/ChatsHeader';
import PullToRefresh from '../components/PullToRefresh';
import ItemRowSkeleton from '../components/ItemRowSkeletons';
import { getDashboardData } from '../actions/dashboardActions';

const ChatsPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: dashboardData, refetch: refetchChats } = useQuery(
    ['dashboard'],
    getDashboardData
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      const recordsFiltered = matchSorter(
        dashboardData?.data?.messages ?? [],
        e.target.value,
        {
          keys: ['first_name', 'last_name', 'send_from']
        }
      );
      setMessages(recordsFiltered);
    } else {
      setMessages(dashboardData?.data?.messages ?? []);
    }
  };

  const handleRefresh = async (e) => {
    // Sync with Zoho here
    return new Promise((resolve) => {
      refetchChats().then(() => {
        resolve();
      });
    });
  };

  useEffect(() => {
    if (dashboardData?.data?.messages) {
      setMessages(dashboardData.data.messages);
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
        <IonSearchbar onIonChange={handleSearchInputChange}></IonSearchbar>
        {isLoading ? (
          <ItemRowSkeleton quantity={9} height={20} />
        ) : (
          <IonList>
            {messages.map((message) => {
              return (
                <ChatsRowItem message={message} key={message.contact_id} />
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChatsPage;
