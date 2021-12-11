import { fromJS } from 'immutable';

import { AppState } from '../types';

import {
  AppActionTypes,
} from '../actions/types';

import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from '../actions/constants';

export const initialState = fromJS({
  userData: {},
  userDataError: null,
  userDataLoading: false,
});

function appReducer(state = initialState, action: AppActionTypes): AppState {
  switch (action.type) {
  case GET_USER_DATA:
    return state
      .set('userDataLoading', true)
      .set('userDataError', null);
  case GET_USER_DATA_SUCCESS:
    return state
      .set('userData', { ...action.payload })
      .set('userDataLoading', false);
  case GET_USER_DATA_ERROR:
    return state
      .set('userDataError', action.payload)
      .set('userDataLoading', false);
  default:
    return state;
  }
}

export default appReducer;
