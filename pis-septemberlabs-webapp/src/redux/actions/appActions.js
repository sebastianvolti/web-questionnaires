import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  SIGN_OUT_USER,
} from './constants';

export function getUserData() {
  return {
    type: GET_USER_DATA,
  };
}

export function getUserDataSuccess(payload) {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload,
  };
}

export function userLogout() {
  return {
    type: SIGN_OUT_USER,
  };
}
