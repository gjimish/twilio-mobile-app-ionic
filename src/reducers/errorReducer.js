import { GET_ERRORS, CLEAR_ERRORS, NO_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
  noErrorMsg: null,
  status: null,
  id: null,
  noError: false
};

export default function error (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
        noError: false
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
        noError: false,
        noErrorMsg: null
      };
    case NO_ERRORS:
      return {
        noError: true,
        noErrorMsg: action.payload.msg
      };
    default:
      return state;
  }
}
