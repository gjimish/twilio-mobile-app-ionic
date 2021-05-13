import axios from 'axios';
import { returnErrors, noErrors } from './errorActions';
import setBasePath from '../utils/setBasePath';
import setAuthToken from '../utils/setAuthToken';

import {
  LOGOUT_SUCCESS,
  GET_SETTINGS_SUCCESS,
  STORE_SETTINGS_SUCCESS
} from './types';

//Get Settings
export const getSettings = () => (dispatch) => {
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
    .get('/api/get-settings', config)
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
          type: GET_SETTINGS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'GET_SETTINGS_FAIL'
        )
      );
    });
};

// Store Settings
export const storeSettings = (data) => (dispatch) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify(data);

  axios
    .post('/api/store-settings', body, config)
    .then((res) => {
      if (
        res.data.status !== undefined &&
        res.data.status === 'Token is Expired'
      ) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      } else {
        dispatch(noErrors('Yes, settings have been saved successfully !'));

        dispatch({
          type: STORE_SETTINGS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'STORE_SETTINGS_FAIL'
        )
      );
    });
};
