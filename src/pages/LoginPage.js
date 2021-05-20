import React, { useState, useEffect } from 'react';
import { login, newLogin } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { fetchAccessToken } from '../actions/callActions';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import Pusher from 'pusher-js';
// Capacitor Dependencies
import { Capacitor } from '@capacitor/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// Environment
import { environment } from '../environments/environment';
import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow
} from '@ionic/react';
import LoginCard from '../components/Login/LoginCard';
import logo from '../assets/logo.png';

function LoginPage({
  isAuthenticated,
  showSync,
  error,
  login,
  fetchAccessToken,
  newLogin
}) {
  let history = useHistory();
  let { auth_token } = useParams();
  const [state, setState] = useState({
    modal: false,
    email: '',
    password: '',
    msg: null,
    loading: false,
    contactsSync: true,
    leadsSync: null,
    messagesSync: null
  });

  useEffect(() => {
    // Check for Login error
    if (error.id === 'LOGIN_FAIL') {
      setState((state) => ({
        ...state,
        msg: error.msg.error,
        loading: false
      }));
    } else {
      setState((state) => ({
        ...state,
        msg: null,
        loading: false
      }));
    }
  }, [error]);

  useEffect(() => {
    // Check for Login error
    if (auth_token !== '' && auth_token !== undefined) {
      let token = Base64.decode(auth_token);

      let data = token.split('|');

      if (data[0] !== '' && data[0] !== undefined) {
        setState((state) => ({
          ...state,
          loading: true
        }));
        const newUser = {
          email: data[0],
          password: data[1],
          userAlreadyExists: data[2]
        };

        login(newUser);
      }
    }
  }, [auth_token, login]);

  useEffect(() => {
    // If authenticated, close modal
    if (isAuthenticated) {
      setState((state) => ({
        ...state,
        msg: null,
        loading: false
      }));
      history.push('/Dashboard');
      fetchAccessToken();
    }
  }, [history, fetchAccessToken, isAuthenticated]);

  useEffect(() => {
    const pusher = new Pusher(environment.PUSHER_ID, {
      cluster: 'us2'
    });
    const channel = pusher.subscribe('incomming-channel');
    channel.bind('login-event', (data) => {
      if (data.type === 'login') {
        console.log('Logged In successfull after syncing data');
        let tempLoginData = JSON.parse(localStorage.getItem('tempLoginData'));
        console.log(tempLoginData);
        newLogin(tempLoginData);
      }
    });

    channel.bind('syncing-event', (data) => {
      if (data.type === 'Contacts') {
        setState((state) => ({
          ...state,
          contactsSync: false,
          leadsSync: true
        }));
      } else if (data.type === 'Leads') {
        setState((state) => ({
          ...state,
          leadsSync: false,
          messagesSync: true
        }));
      } else if (data.type === 'twiliosmsextension0__Sent_SMS') {
        setState((state) => ({
          ...state,
          messagesSync: false
        }));
      }
    });
  }, [newLogin]);

  // This function is used to do authenticate
  function onDoAuth() {
    // Check platform is native or not (android/ios/web)
    if (Capacitor.isNative) {
      const browser = InAppBrowser.create(
        environment.MOBILE_LOGIN_URL,
        '_blank'
      );
      browser.on('loadstop').subscribe((event) => {
        if (event.url != null && event.url.indexOf('Login/') > -1) {
          const url = event.url;
          let auth_token = url.substring(url.lastIndexOf('/') + 1);
          if (auth_token !== '' && auth_token !== undefined) {
            browser.close();
            let token = Base64.decode(auth_token);
            let data = token.split('|');
            if (data[0] !== '' && data[0] !== undefined) {
              setState((state) => ({
                ...state,
                loading: true
              }));
              const newUser = {
                email: data[0],
                password: data[1],
                userAlreadyExists: data[2]
              };
              login(newUser);
            }
          }
        }
      });
      browser.on('load');
    } else {
      // for web app
      console.log(environment.ZOHO_LOGIN_REDIRECT_URI);
      window.open(environment.ZOHO_LOGIN_REDIRECT_URI, '_self');
    }
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid style={{ height: '100%' }}>
          <IonRow
            style={{
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <img src={logo} alt="Logo" style={{ width: '200px' }} />
          </IonRow>
          <IonRow
            style={{
              height: '70%'
            }}>
            <IonCol sizeLg="5">
              <LoginCard
                isLoading={state.loading}
                showSync={showSync}
                isContactsSyncing={state.contactsSync}
                isLeadsSyncing={state.leadsSync}
                isMessagesSyncing={state.messagesSync}
                onDoAuth={onDoAuth}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonAlert
        isOpen={!!state.msg}
        onDidDismiss={() => {
          setState((state) => ({
            ...state,
            msg: null,
            loading: false
          }));
        }}
        header={'Login Error'}
        message={state.msg}
        buttons={[
          {
            text: 'Ok',
            handler: () => {
              setState((state) => ({
                ...state,
                msg: null,
                loading: false
              }));
            }
          }
        ]}
      />
    </IonPage>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  showSync: state.auth.showSync
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
    clearErrors: () => dispatch(clearErrors()),
    fetchAccessToken: () => dispatch(fetchAccessToken()),
    newLogin: (data) => dispatch(newLogin(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
