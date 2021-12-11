import {
  take,
  put,
  call,
  select,
} from 'redux-saga/effects';

import * as constants from '../actions/constants';
import * as questionnaireActions from '../actions/questionnaireActions';

import api from '../../api';

function* getQuestionnaire() {
  while (true) {
    const { surveyId } = yield take(constants.GET_QUESTIONNAIRE);
    try {
      // make API call to get Questionnaire
      const questionnaireInfo = yield call(api.getQuestionnaire, surveyId);
      yield put(questionnaireActions.getQuestionnaireSuccess(questionnaireInfo));
    } catch (error) {
      // Catch error if User not logged in
      // Redirect to Login Page
    }
  }
}

function* finishQuestionnaire() {
  while (true) {
    const { surveyId, participationId } = yield take(constants.FINISH_QUESTIONNAIRE);
    try {
      const body = `{"participationId":${participationId}}`
      const result = yield call(api.finishQuestionnaire, surveyId, body);
      yield put(questionnaireActions.getFinishStatus(result));
    } catch (error) {
      // Catch error 
    }
  }
}


function* setAnswer() {
  while (true) {
    try {
      const { payload: { index, answer } } = yield take(constants.SET_ANSWER);
      const { participationId, questions } = yield select((state) => state.questionnaireReducer.get('questionnaire').data);
      // make API call to send Answer
      yield call(api.sendAnswer(participationId, questions[index].id, answer));
    } catch (error) {
      // Catch error something is wrong
    }
  }
}

export default [
  getQuestionnaire,
  finishQuestionnaire,
  setAnswer,
];
