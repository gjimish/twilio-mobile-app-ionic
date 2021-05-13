import { GET_ERRORS, CLEAR_ERRORS, NO_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// CLEAR ERRORS
export const noErrors = (msg) => {
  return {
    type: NO_ERRORS,
    payload: { msg }
  };
};
