import { GET_DASHBOARD_DATA } from '../actions/types';

const initialState = {
  inboundMsgs: 0,
  outboundMsgs: 0,
  incommingCalls: 0,
  outgoingCalls: 0,
  totalContacts: 0,
  fiveContacts: [],
  messages: [],
  calls: []
};

export default function dashboard (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        inboundMsgs: action.payload.inboundMsgs,
        outboundMsgs: action.payload.outboundMsgs,
        incommingCalls: action.payload.incommingCalls,
        outgoingCalls: action.payload.outgoingCalls,
        totalContacts: action.payload.totalContacts,
        fiveContacts: action.payload.fiveContacts,
        messages: action.payload.messages
        // calls: action.payload.calls
      };

    default:
      return state;
  }
}
