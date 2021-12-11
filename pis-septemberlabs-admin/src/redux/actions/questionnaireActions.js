import {
  GET_QUESTIONNAIRE,
  GET_QUESTIONNAIRE_SUCCESS,
  GET_QUESTIONNAIRE_ERROR,
  SAVE_QUESTIONNAIRE,
  SAVE_QUESTIONNAIRE_SUCCESS,
  SAVE_QUESTIONNAIRE_ERROR,
  SET_IS_EDITING,
  CLEAR_QUESTIONNAIRE,
} from './constants';

export function setIsEditing(payload) {
  return {
    type: SET_IS_EDITING,
    payload,
  };
}

export function getQuestionnaire(payload) {
  return {
    type: GET_QUESTIONNAIRE,
    payload,
  };
}

export function getQuestionnaireSuccess(payload) {
  return {
    type: GET_QUESTIONNAIRE_SUCCESS,
    payload,
  };
}

export function getQuestionnaireError(payload) {
  return {
    type: GET_QUESTIONNAIRE_ERROR,
    payload,
  };
}

export function saveQuestionnaire(payload) {
  return {
    type: SAVE_QUESTIONNAIRE,
    payload,
  };
}

export function saveQuestionnaireSuccess() {
  return {
    type: SAVE_QUESTIONNAIRE_SUCCESS,
  };
}

export function saveQuestionnaireError(payload) {
  return {
    type: SAVE_QUESTIONNAIRE_ERROR,
    payload,
  };
}

export function clearQuestionnaire() {
  return {
    type: CLEAR_QUESTIONNAIRE,
  };
}
