import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  LOGIN_TEMP,
  NEVER_ASK_FOR_PERMISSION,
  ON_UPDATE_HOOKS
} from '../actions/types';

// localStorage.removeItem('token');
// localStorage.removeItem('isAuthenticated');
// localStorage.removeItem('user');
//localStorage.setItem('webhook_permission', '0');
// localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2F2LnZpblwvcHdhLWJhY2tlbmRcL3B1YmxpY1wvYXBpXC9sb2dpbiIsImlhdCI6MTU5MjM3NjY5MCwiZXhwIjoxNTkyMzgwMjkwLCJuYmYiOjE1OTIzNzY2OTAsImp0aSI6IklvMWd1aFRPa3FsNFRJSTMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.WXo5ju2LxFrdromgffhzcnSbcUjz6xUnfrRDNIgoEnM');
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('isAuthenticated')
    ? localStorage.getItem('isAuthenticated')
    : false,
  zoho_user_role: localStorage.getItem('zoho_user_role'),
  webhook_permission: localStorage.getItem('webhook_permission'),
  isLoading: false,
  user: JSON.parse(localStorage.getItem('user')), //{name:'shamroz','email':'shamroz@gmail.com'}
  tempLoginData: [],
  tempToken: '',
  onUpdateHooks: false,
  showSync: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case NEVER_ASK_FOR_PERMISSION:
      localStorage.setItem(
        'webhook_permission',
        action.payload.webhook_permission
      );
      return {
        ...state,
        webhook_permission: action.payload.webhook_permission
      };
    case ON_UPDATE_HOOKS:
      return {
        ...state,
        onUpdateHooks: true
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      if (action.payload) {
        localStorage.setItem('token', action?.payload?.token);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem(
          'zoho_user_role',
          action.payload.user.zoho_user_role
        );
        localStorage.setItem(
          'webhook_permission',
          action.payload.user.webhook_permission
        );
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.user,
          zoho_user_role: action.payload.user.zoho_user_role,
          webhook_permission: action.payload.user.webhook_permission,
          showSync: action.payload.showSync
        };
      }
      return state;
    case LOGIN_TEMP:
      localStorage.setItem('tempLoginData', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        tempToken: action.payload.token,
        tempLoginData: action.payload,
        showSync: action.payload.showSync
      };
    case UPDATE_PROFILE_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user
      };
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('zoho_user_role');
      localStorage.removeItem('webhook_permission');
      try {
        localStorage.clear();
      } catch (e) {
        // ignore error. Maybe they're using brave
      }
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        showSync: false
      };
    default:
      return state;
  }
}
