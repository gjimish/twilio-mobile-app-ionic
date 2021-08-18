import { Capacitor } from '@capacitor/core';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import setBasePath from '../utils/setBasePath';
import { logOutIfRequestUnauthenticated } from './authActions';
import { DISCONNECT_CALL, FETCH_ACCESS_TOKEN } from './types';

//Get acces token
export const fetchAccessToken = () => (dispatch) => {
  setBasePath();
  setAuthToken();
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'operating_system': Capacitor.platform
    }
  };
  // Request body
  axios
    .get('/api/access-token', config)
    .then((res) => {
      dispatch({
        type: FETCH_ACCESS_TOKEN,
        payload: res.data
      });
    })
    .catch((err) => {
      logOutIfRequestUnauthenticated(err, dispatch)
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, 'FETCH_CHAT_FAIL')
      // )
    });
};

//Get acces token
export const disconnectCall = () => (dispatch) => {
  dispatch({
    type: DISCONNECT_CALL
  });
};
