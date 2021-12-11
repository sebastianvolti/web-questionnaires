import {
  GET_QUESTIONNAIRE,
  GET_QUESTIONNAIRE_SUCCESS,
  FINISH_QUESTIONNAIRE,
  GET_FINISH_STATUS,
  SET_ANSWER,
} from './constants';

export function getQuestionnaire(surveyId) {
  return {
    type: GET_QUESTIONNAIRE,
    surveyId,
  };
}

export function getQuestionnaireSuccess(questionnaire) {
  return {
    type: GET_QUESTIONNAIRE_SUCCESS,
    payload: questionnaire,
  };
}

export function finishQuestionnaire(surveyId, participationId) {
  return {
    type: FINISH_QUESTIONNAIRE,
    surveyId,
    participationId,
  };
}

export function getFinishStatus(status) {
  return {
    type: GET_FINISH_STATUS,
    payload: status,
  };
}

export function setAnswer(index, answer) {
  return {
    type: SET_ANSWER,
    payload: { index, answer },
  };
}
