import { useState, useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import PullToRefresh from '../components/PullToRefresh';
import ContactsRowItem from '../components/Contacts/ContactsRowItem';
import query from '../utils/query';
import setBasePath from '../utils/setBasePath';
import setAuthToken from '../utils/setAuthToken';
import { debounce } from 'lodash';
import ItemRowSkeletons from '../components/ItemRowSkeletons';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';

const DEBOUNCE_DELAY = 500;

const requestSearch = (value, regex = false) => ({
  value,
  regex
});

const columns = [
  {
    data: 'action',
    name: 'action',
    html: true,
    orderable: false,
    searchable: false
  },
  { data: 'first_name', name: 'first_name' },
  { data: 'last_name', name: 'last_name' },
  { data: 'email', name: 'email' },
  { data: 'number', name: 'number' },
  { data: 'status', name: 'status', html: true },
  { data: 'type', name: 'type' },
  { data: 'created_at', name: 'created_at' }
];

const ContactsPage = () => {
  setBasePath();
  setAuthToken();
  const [currentPage, setCurrentPage] = useState(0);

  const [entriesToShow, setEntriesToShow] = useState(15);
  const [searchInput, setSearchInput] = useState('');
  const [orderColumnIndex, setOrderColumnIndex] = useState(7);
  const [orderColumnDirection, setOrderColumnDirection] = useState('desc');
  const [drawCount, setDrawCount] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [recordsFiltered, setRecordsFiltered] = useState(0);
  const [contacts, setContacts] = useState([]);
  const infiniteScrollRef = useRef(null);

  const getColumns = () => {
    return columns.slice(0).map((column) =>
      Object.assign(
        {
          searchable: true,
          orderable: true,
          search: requestSearch('')
        },
        column
      )
    );
  };

  const getRequestData = (searchInput, currentPage) => {
    return {
      columns: getColumns(),
      start: currentPage * entriesToShow,
      length: entriesToShow,
      search: requestSearch(searchInput),
      order: [
        {
          column: orderColumnIndex,
          dir: orderColumnDirection
        }
      ],
      draw: drawCount
    };
  };

  const updateTableState = (response, doAppend) => {
    if (response.data.status === 'Token is Expired') {
      // store.dispatch(logout());  TODO Do we want to do this? Why commented?
      setIsRefreshing(false);
    } else {
      setIsRefreshing(false);
      setRecordsTotal(response.data.recordsTotal);
      setRecordsFiltered(response.data.recordsFiltered);
      setDrawCount(response.data.draw + 1);

      if (doAppend) {
        setContacts([...contacts, ...response.data.data]);
      } else {
        setContacts(response.data.data);
      }
    }
  };

  // doAppend is used for infinite scrolling
  const refreshContactsData = async (doAppend = false) => {
    return new Promise((resolve) => {
      query({
        url: '/api/contacts-list',
        method: 'get',
        data: getRequestData(searchInput, currentPage)
      }).then((response) => {
        updateTableState(response, doAppend);
        resolve();
      });
    });
  };

  const handleSetSearchInput = (e) => {
    setCurrentPage(0);
    setSearchInput(e.target.value);
  };

  const delayedSearch = debounce(() => {
    console.log('handle search');
    setIsRefreshing(true);
    refreshContactsData();
  }, DEBOUNCE_DELAY);

  // When the search input is updated, refresh
  useEffect(() => {
    if (currentPage === 0) {
      delayedSearch();
    }
  }, [searchInput]);

  // When the current page number is increased, refresh and append
  useEffect(() => {
    if (currentPage > 0) {
      refreshContactsData(true).then(() => {
        infiniteScrollRef.current.complete();
      });
    }
  }, [currentPage]);

  useEffect(() => {
    setIsRefreshing(true);
    refreshContactsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PullToRefresh handleRefresh={refreshContactsData} />
        {/* This shrinks the header on iphone */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contacts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar onIonChange={handleSetSearchInput}></IonSearchbar>
        {isRefreshing ? (
          <div style={{ marginTop: '28px' }}>
            <ItemRowSkeletons quantity={9} height={20} heightOffset={1} />
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center' }}>{recordsTotal} Contacts</div>
            <IonList>
              {contacts.map((contact) => {
                return <ContactsRowItem contact={contact} key={contact.id} />;
              })}
            </IonList>
          </>
        )}
        <IonInfiniteScroll
          ref={infiniteScrollRef}
          threshold="100px"
          onIonInfinite={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default ContactsPage;
