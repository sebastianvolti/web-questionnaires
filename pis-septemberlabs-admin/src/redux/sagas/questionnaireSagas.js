import {
  take,
  put,
  call,
} from 'redux-saga/effects';

import * as constants from '../actions/constants';
import * as questionnaireActions from '../actions/questionnaireActions';

import api from '../../api';

function* getQuestionnaire() {
  while (true) {
    const { payload } = yield take(constants.GET_QUESTIONNAIRE);
    try {
      const questionnaire = yield call(api.getQuestionnaire, payload);
      yield put(questionnaireActions.getQuestionnaireSuccess(questionnaire?.data));
    } catch (error) {
      yield put(questionnaireActions.getQuestionnaireError(error?.message));
    }
  }
}

function* saveQuestionnaire() {
  while (true) {
    const { payload } = yield take(constants.SAVE_QUESTIONNAIRE);
    try {
      if (payload?.surveyId) {
        yield call(api.updateQuestionnaire, payload?.surveyId, payload?.body);
      } else {
        yield call(api.saveQuestionnaire, payload?.body);
      }
      yield put(questionnaireActions.saveQuestionnaireSuccess());
    } catch (error) {
      yield put(questionnaireActions.saveQuestionnaireError(error?.message));
    }
  }
}

export default [
  getQuestionnaire,
  saveQuestionnaire,
];
