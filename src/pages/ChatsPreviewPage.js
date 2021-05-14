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
import { fetchRecentConversations } from '../actions/smsActions';

const ChatsPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: dashboardData, refetch: refetchChats } = useQuery(
    [
      'recentConversations',
      { filterMode: 'unreplied', perPage: 20, pageNum: 1, newestFirst: true }
    ],
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
        <IonSearchbar onIonChange={handleSearchInputChange}></IonSearchbar>
        {isLoading ? (
          <ItemRowSkeleton quantity={9} height={20} />
        ) : (
          <IonList>
            {messages.map((message) => {
              return (
                <ChatsRowItem message={message} key={message.recent_message.contact_id} />
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChatsPage;
