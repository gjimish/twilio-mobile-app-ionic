import axios from 'axios';
import moment from 'moment';
import setAuthToken from '../utils/setAuthToken';
import setBasePath from '../utils/setBasePath';
import { noErrors, returnErrors } from './errorActions';
import {
  AUTH_ERROR,
  LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_TEMP, LOGOUT_SUCCESS, NEVER_ASK_FOR_PERMISSION,
  ON_UPDATE_HOOKS, REGISTER_FAIL, REGISTER_SUCCESS, UPDATE_PROFILE_IMAGE_SUCCESS, UPDATE_PROFILE_SUCCESS
} from './types';


export function logOutIfRequestUnauthenticated(error, dispatch) {
  if (
    error.response &&
    error.response.status !== undefined &&
    error.response.status === 401
  ) {
    dispatch({
      type: AUTH_ERROR
    });
    return true
  }
  return false
}

// Check token & load user
export const loadUser = () => (dispatch) => {
  setBasePath();
  setAuthToken();

  // User loading
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios
    .get('/api/get-user', config)
    .then((res) => {

    })
    .catch((err) => {
      logOutIfRequestUnauthenticated(err, dispatch)
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'UPDATE_PROFILE_FAIL'
        )
      );
    });
};

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/register', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Update Profile
export const updateProfile = (data) => (dispatch) => {
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
    .post('/api/update-profile', body, config)
    .then((res) => {
      dispatch(
        noErrors("Yes, you've successfully saved your profile information !")
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      if (!logOutIfRequestUnauthenticated(err, dispatch)) {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            'UPDATE_PROFILE_FAIL'
          )
        );
      }
    });
};

// Register User
export const updateProfileImage = (data) => (dispatch) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  // Request body
  // const body = JSON.stringify(data);

  axios
    .post('/api/update-profile-image', data, config)
    .then((res) => {
      dispatch(noErrors('Yes, profile image updated successfully !'));
      dispatch({
        type: UPDATE_PROFILE_IMAGE_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      if (!logOutIfRequestUnauthenticated(err, dispatch)) {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            'UPDATE_PROFILE_IMAGE_FAIL'
          )
        );
      }
    });
};

// Never Ask For webhooks update permission
export const neverAskAgainPermission = (data) => (dispatch) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  // Request body
  // const body = JSON.stringify(data);

  axios
    .post('/api/never-ask-for-permission', data, config)
    .then((res) => {
      dispatch({
        type: NEVER_ASK_FOR_PERMISSION,
        payload: res.data
      });
    })
    .catch((err) => {
      if (!logOutIfRequestUnauthenticated(err, dispatch)) {
        console.log(err);
      }
    });
};

// Update sms and voice hooks
export const onUpdateHooks = (data) => (dispatch) => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  // Request body
  const data2 = JSON.stringify(data);

  axios
    .post('/api/on-update-hooks', data2, config)
    .then((res) => {
      dispatch({
        type: ON_UPDATE_HOOKS,
        payload: res.data
      });
    })
    .catch((err) => {
      if (!logOutIfRequestUnauthenticated(err, dispatch)) {
        console.log(err);
      }
    });
};

// Login User
export const login = ({ email, password, userAlreadyExists }) => (dispatch) => {
  setBasePath();
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password, userAlreadyExists });

  axios
    .post('/api/login', body, config)
    .then((res) => {
      const lastSyncTime = res.data.lastSyncTime;
      const diff = moment().diff(moment(lastSyncTime), 'days');
      if (diff <= 1) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...res.data, showSync: false }
        });
      } else {
        dispatch({
          type: LOGIN_TEMP,
          payload: { ...res.data, showSync: true }
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: LOGIN_FAIL
        });
      } else {
        dispatch(
          returnErrors(err.msg, 400, 'OTHER_FAIL')
        );
      }
    });
};

// New Login Confim After Sync
export const newLogin = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
