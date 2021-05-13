import {
  SAVE_CONTACT_SUCCESS,
  GET_CONTACTS_SUCCESS,
  EDIT_CONTACT_SUCCESS,
  CLEAR_CONTACTS_DATA,
  SYNC_CONTACTS_SUCCESS
} from '../actions/types';

const initialState = {
  contacts: [],
  contactData: {},
  sync: false
};

export default function contact (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload.contacts
      };
    case SYNC_CONTACTS_SUCCESS:
      return {
        ...state,
        sync: true
      };
    case SAVE_CONTACT_SUCCESS:
      return {
        ...state,
        // contacts: action.payload.contacts,
        contactData: {}
      };
    case EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        contactData: action.payload.contactData
      };
    case CLEAR_CONTACTS_DATA:
      return {
        ...state,
        contactData: {},
        sync: false
      };
    default:
      return state;
  }
}
