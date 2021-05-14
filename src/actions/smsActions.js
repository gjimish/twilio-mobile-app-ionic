import axios from 'axios';

import setBasePath from '../utils/setBasePath';
import setAuthToken from '../utils/setAuthToken';

import { CLEAR_CHAT_HISTORY } from './types';

//Get Settings
export const fetchChatHistory = (id) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ id: id });
  // Request body
  return axios.post('/api/fetch-chat', body, config);
};

// Get Recent conversations
export const fetchRecentConversations = (props) => {
  setBasePath();
  setAuthToken();
  const { filterMode, perPage, pageNum, newestFirst } = props.queryKey[1];
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  return axios.get(
    `/api/recent-conversations?mode=${filterMode}&per_page=${perPage}&page=${pageNum}&latest_to_oldest=${newestFirst}`,
    config
  );
};

export const sendSMS = (data) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(data);

  // Request body
  return axios
    .post('/api/send-sms', body, config)
    .then((res) => res.data)
    .catch((err) => {
      return err.response.data;
    });
};

export const clearChatHistory = () => (dispatch) => {
  dispatch({
    type: CLEAR_CHAT_HISTORY
  });
};

export const fetchToNumbers = (id) => {
  setBasePath();
  setAuthToken();
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  return axios.get(`/api/fetch-to-number?id=${id}`, config);
};

export const fetchFromNumbers = (id) => {
  setBasePath();
  setAuthToken();
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  return axios.get(`/api/from-number?id=${id}`, config);
};

export const fetchContactsList = () => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  return axios.get('/api/fetch-contacts-list', config);
};

export const searchContacts = (value) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.get(`/api/search/${value}`, config);
};
