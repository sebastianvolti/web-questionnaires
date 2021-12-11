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
      yield put(appActions.getUserDataSuccess(userData?.data));
    } catch (error) {
      yield put(appActions.getUserDataError(error.message));
    }
  }
}

function* userLogoutSaga() {
  while (true) {
    yield take(constants.SIGN_OUT_USER);
    try {
      yield call(api.logoutUser);
      yield put(appActions.getUserDataSuccess({}));
    } catch (error) {
      yield put(appActions.getUserDataError(error));
    }
  }
}

export default [
  userDataSaga,
  userLogoutSaga,
];
