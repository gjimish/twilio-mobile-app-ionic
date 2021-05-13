import {
  FETCH_CHAT_SUCCESS,
  SEND_SMS_SUCCESS,
  CLEAR_CHAT_HISTORY,
  FETCH_FROM_NUMBERS_SUCCESS,
  FETCH_TO_NUMBERS_SUCCESS
} from '../actions/types';

const initialState = {
  chat: [],
  user: {},
  contactsList: [],
  smsSent: false,
  setting: {},
  toNumbers: [],
  fromNumbers: []
};

export default function sms (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        chat: action.payload.chat,
        user: action.payload.user,
        contactsList: action.payload.contactsList,
        setting: action.payload.setting
      };
    case CLEAR_CHAT_HISTORY:
      return {
        ...state,
        chat: [],
        user: {},
        contactsList: []
      };
    case SEND_SMS_SUCCESS:
      return {
        ...state,
        smsSent: true
      };
    case FETCH_TO_NUMBERS_SUCCESS:
      return {
        ...state,
        toNumbers: action.payload.contactData
      };
    case FETCH_FROM_NUMBERS_SUCCESS:
      return {
        ...state,
        fromNumbers: action.payload.contactData
      };
    default:
      return state;
  }
}
