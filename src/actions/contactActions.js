import axios from 'axios';
import { returnErrors, noErrors } from './errorActions';
import setBasePath from '../utils/setBasePath';
import setAuthToken from '../utils/setAuthToken';

import {
  LOGOUT_SUCCESS,
  GET_CONTACTS_SUCCESS,
  EDIT_CONTACT_SUCCESS,
  SAVE_CONTACT_SUCCESS,
  CLEAR_CONTACTS_DATA,
  SYNC_CONTACTS_SUCCESS
} from './types';

//sync Contacts
export const syncContacts = () => (dispatch) => {
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
    .get('/api/sync-current-user-records', config)
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
          type: SYNC_CONTACTS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'SYNC_CONTACTS_FAIL'
        )
      );
    });
};

//Get Contacts
export const getContacts = () => (dispatch) => {
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
    .get('/api/contacts-list', config)
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
          type: GET_CONTACTS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'GET_CONTACTS_FAIL'
        )
      );
    });
};

// Store Contact
export const saveContact = (data) => (dispatch) => {
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
    .post('/api/save-contacts', body, config)
    .then((res) => {
      if (
        res.data.status !== undefined &&
        res.data.status === 'Token is Expired'
      ) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      } else {
        dispatch(noErrors('Yes, contact has been successfully saved !'));

        dispatch({
          type: SAVE_CONTACT_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(() => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, 'SAVE_CONTACT_FAIL')
      // )
    });
};

export const deleteContact = (data) => (dispatch) => {
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
    .post('/api/delete-contact', body, config)
    .then((res) => {
      if (
        res.data.status !== undefined &&
        res.data.status === 'Token is Expired'
      ) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      } else {
        dispatch(noErrors('Yes, contact has been successfully deleted !'));

        // dispatch({
        //   type: SAVE_CONTACT_SUCCESS,
        //   payload: res.data
        // })
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'DELETE_CONTACT_FAIL'
        )
      );
    });
};

export const clearContactData = () => (dispatch) => {
  dispatch({
    type: CLEAR_CONTACTS_DATA
  });
};

export const editContact = (data) => (dispatch) => {
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
    .post('/api/edit-contact', body, config)
    .then((res) => {
      if (
        res.data.status !== undefined &&
        res.data.status === 'Token is Expired'
      ) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      } else {
        // dispatch(
        //   noErrors("Yes, contact has been successfully deleted !")
        // );

        dispatch({
          type: EDIT_CONTACT_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'DELETE_CONTACT_FAIL'
        )
      );
    });
};
