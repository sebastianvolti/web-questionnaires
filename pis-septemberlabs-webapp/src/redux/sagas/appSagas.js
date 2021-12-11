import {
  take,
  put,
  call,
} from 'redux-saga/effects';

import * as constants from '../actions/constants';
import * as appActions from '../actions/appActions';

import api from '../../api';

function* userDataSaga() {
  while (true) {
    yield take(constants.GET_USER_DATA);
    try {
      const userData = yield call(api.getUserData);
      yield put(appActions.getUserDataSuccess(userData));
    } catch (error) {
      // TODO handle userData error
    }
  }
}

function* userLogoutSaga() {
  while (true) {
    yield take(constants.SIGN_OUT_USER);
    try {
      const userData = yield call(api.userLogout);
      yield put(appActions.getUserDataSuccess(userData));
    } catch (error) {
      // TODO handle userData error
    }
  }
}

export default [
  userDataSaga,
  userLogoutSaga,
];
