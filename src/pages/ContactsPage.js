import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import ContactsRowItem from '../components/Contacts/ContactsRowItem';
import ItemRowSkeletons from '../components/ItemRowSkeletons';
import PullToRefresh from '../components/PullToRefresh';
import query from '../utils/query';
import setAuthToken from '../utils/setAuthToken';
import setBasePath from '../utils/setBasePath';
import { filterOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';

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
  const searchRef = useRef(true);
  const dispatch = useDispatch();

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
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined
  });
  const [contactsFilter, setContactsFilter] = useState({
    showContacts: true,
    showLeads: true,
    showDeals: true,
    showCustomModules: true,
    perPage: 20,
    pageNum: 1
  });

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
    if (response.data.status === 'Authorization Token not found') {
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
        data: getRequestData(searchInput, currentPage),
        dispatch: dispatch,
      }).then((response) => {
        updateTableState(response, doAppend);
        resolve();
      });
    });
  };

  const syncContactsData = async () => {
    await query({
      url: '/api/sync-current-user-records',
      method: 'get',
      dispatch: dispatch,
      data: {}
    })
    refreshContactsData();
  };

  const handleSetSearchInput = (e) => {
    setCurrentPage(0);
    setSearchInput(e.target.value);
  };

  const handleSearchButton = (e) => {
    if (e.key == 'Enter') {
      e.target.blur()
    }
  }

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
        <PullToRefresh handleRefresh={syncContactsData} />
        {/* This shrinks the header on iphone */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contacts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className="ion-align-items-center">
          <button ref={searchRef} style={{ position: 'absolute', backgroundColor: 'white' }} />
          <IonCol>
            <IonSearchbar
              onIonClear={() => { setTimeout(() => { searchRef.current.focus() }, 100) }}
              onKeyUp={handleSearchButton} onIonChange={handleSetSearchInput}></IonSearchbar>
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
            <IonLabel position="start">Contacts</IonLabel>
            <IonCheckbox
              checked={contactsFilter.showContacts}
              name="Contacts"
              onIonChange={(e) => {
                setContactsFilter((prevState) => ({
                  ...prevState,
                  showContacts: e.detail.checked
                }));
              }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Leads</IonLabel>
            <IonCheckbox
              checked={contactsFilter.showLeads}
              name="Leads"
              onIonChange={(e) => {
                setContactsFilter((prevState) => ({
                  ...prevState,
                  showLeads: e.detail.checked
                }));
              }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Deals</IonLabel>
            <IonCheckbox
              checked={contactsFilter.showDeals}
              name="Deals"
              onIonChange={(e) => {
                setContactsFilter((prevState) => ({
                  ...prevState,
                  showDeals: e.detail.checked
                }));
              }}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="start">Custom Modules</IonLabel>
            <IonCheckbox
              checked={contactsFilter.showCustomModules}
              name="CustomModules"
              onIonChange={(e) => {
                setContactsFilter((prevState) => ({
                  ...prevState,
                  showCustomModules: e.detail.checked
                }));
              }}
            />
          </IonItem>
        </IonPopover>
        {isRefreshing ? (
          <div style={{ marginTop: '28px' }}>
            <ItemRowSkeletons quantity={9} height={20} heightOffset={1} />
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center' }}>{recordsTotal} Contacts</div>
            <IonList>
              {contacts.map((contact) => {
                if (
                  (contactsFilter.showContacts && contact.type == 'Contacts') ||
                  (contactsFilter.showLeads && contact.type == 'Leads') ||
                  (contactsFilter.showDeals && contact.type == 'Deals') ||
                  (contactsFilter.showCustomModules &&
                    contact.type != 'Deals' &&
                    contact.type != 'Leads' &&
                    contact.type != 'Contacts')
                ) {
                  return (
                    <ContactsRowItem
                      query={searchInput}
                      contact={contact}
                      key={contact.id}
                    />
                  );
                }
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
