import { Capacitor, Plugins } from '@capacitor/core';
import { AppVersion } from '@ionic-native/app-version';
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
  IonToolbar, useIonRouter
} from '@ionic/react';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import axios from 'axios';
import { filterOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { version } from '../../package.json';
import { logOutIfRequestUnauthenticated } from '../actions/authActions';
import { fetchRecentConversations } from '../actions/smsActions';
import ChatsHeader from '../components/Chats/ChatsHeader';
import ChatsRowItem from '../components/Chats/ChatsRowItem';
import ItemRowSkeleton from '../components/ItemRowSkeletons';
import PullToRefresh from '../components/PullToRefresh';
import './Popover.css';


const { App, Keyboard } = Plugins;

const ChatsPage = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(true);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined
  });
  const [conversationsFilter, setConversationsFilter] = useState({
    filterMode: 'unreplied',
    showLeads: true,
    showContacts: true,
    showDeals: true,
    showCustomModules: true,
    perPage: 20,
    pageNum: 1,
    newestFirst: true
  });

  const { data: dashboardData, refetch: refetchChats } = useQuery(
    ['conversationsQuery', conversationsFilter],
    fetchRecentConversations
  );

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const searchWithDelay = debounce((e) => {
    const value = e.target.value;
    if (value) {
      axios.get(`api/search/${value}`).then((response) => {
        setMessages(response.data.searchResult);
      }).catch(err => {
        logOutIfRequestUnauthenticated(err, dispatch)
      });
    } else {
      setMessages(dashboardData?.data?.contacts ?? []);
    }
  });

  const handleSearchInputChange = (e) => {
    searchWithDelay(e)
  };

  const handleRefresh = async (e) => {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Videos',
      eventAction: 'play',
      eventLabel: 'Fall Campaign'
    });

    return new Promise((resolve) => {
      refetchChats().then(() => {
        resolve();
      });
    });
  };

  const handleSearchButton = (e) => {
    if (e.key == 'Enter') {
      e.target.blur()
    }
  }

  useEffect(async () => {
    let versionCode
    if (Capacitor.isNative) {
      let res = await AppVersion.getVersionCode()
      versionCode = res
    } else {
      versionCode = version
    }

    let currentUser = JSON.parse(window.localStorage.getItem('user'))

    Sentry.init({
      dsn: 'https://5be1e6ef7a934bc49d8647b07c4728e8@sentry.delugeonaluge.com/8',
      integrations: [new Integrations.BrowserTracing()],
      initialScope: {
        user: { username: currentUser.name, id: currentUser.zoho_user_id },
        extra: { appVersion: versionCode }
      },
      tracesSampleRate: 1.0
    });
  }, [])

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
          <button ref={searchRef} style={{ position: 'absolute', backgroundColor: 'white' }} />
          <IonCol>
            <IonSearchbar
              onIonClear={() => { setTimeout(() => { searchRef.current.focus() }, 100) }}
              onKeyUp={handleSearchButton}
              onIonChange={handleSearchInputChange} />
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
                    key={message.id}
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
