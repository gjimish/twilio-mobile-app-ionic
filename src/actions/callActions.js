import axios from 'axios';

import setBasePath from '../utils/setBasePath';
import setAuthToken from '../utils/setAuthToken';

import { LOGOUT_SUCCESS, FETCH_ACCESS_TOKEN, DISCONNECT_CALL } from './types';

//Get acces token
export const fetchAccessToken = () => (dispatch) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  axios
    .get('/api/access-token', config)
    .then((res) => {
      if (
        res.data.status !== undefined &&
        res.data.status === 'Token is Expired'
      ) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      } else {
        dispatch({
          type: FETCH_ACCESS_TOKEN,
          payload: res.data
        });
      }
    })
    .catch(() => {
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
