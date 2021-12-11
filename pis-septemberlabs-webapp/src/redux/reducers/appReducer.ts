import { fromJS } from 'immutable';

import { AppState } from '../types';

import {
  AppActionTypes,
} from '../actions/types';

import {
  GET_USER_DATA_SUCCESS,
} from '../actions/constants';

export const initialState = fromJS({
  userData: null,
});

function appReducer(state = initialState, action: AppActionTypes): AppState {
  switch (action.type) {
  case GET_USER_DATA_SUCCESS:
    return state.set('userData', action.payload);
  default:
    return state;
  }
}

export default appReducer;
