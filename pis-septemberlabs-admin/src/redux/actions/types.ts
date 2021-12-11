import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  GET_USER_DATA,
  SIGN_OUT_USER,
  SET_IS_EDITING,
  GET_QUESTIONNAIRE,
  GET_QUESTIONNAIRE_SUCCESS,
  GET_QUESTIONNAIRE_ERROR,
  SAVE_QUESTIONNAIRE,
  SAVE_QUESTIONNAIRE_SUCCESS,
  SAVE_QUESTIONNAIRE_ERROR,
  CLEAR_QUESTIONNAIRE,
} from './constants';

interface getUserData {
  type: typeof GET_USER_DATA
  payload: any
}

interface getUserDataSuccess {
  type: typeof GET_USER_DATA_SUCCESS
  payload: any
}

interface getUserDataError {
  type: typeof GET_USER_DATA_ERROR
  payload: any
}

interface signOutUser {
  type: typeof SIGN_OUT_USER
  payload: any
}

interface setIsEditing {
  type: typeof SET_IS_EDITING
  payload: any
}

interface getQuestionnaire {
  type: typeof GET_QUESTIONNAIRE
  payload: any
}

interface getQuestionnaireSuccess {
  type: typeof GET_QUESTIONNAIRE_SUCCESS
  payload: any
}

interface getQuestionnaireError {
  type: typeof GET_QUESTIONNAIRE_ERROR
  payload: any
}

interface saveQuestionnaire {
  type: typeof SAVE_QUESTIONNAIRE
  payload: any
}

interface saveQuestionnaireSuccess {
  type: typeof SAVE_QUESTIONNAIRE_SUCCESS
}

interface saveQuestionnaireError {
  type: typeof SAVE_QUESTIONNAIRE_ERROR
  payload: any
}

interface clearQuestionnaire {
  type: typeof CLEAR_QUESTIONNAIRE
  payload: any
}

export type AppActionTypes = getUserData | getUserDataSuccess | getUserDataError | signOutUser;

export type QuestionnaireActionTypes =
  setIsEditing | getQuestionnaire |
  getQuestionnaireSuccess | getQuestionnaireError |
  clearQuestionnaire | saveQuestionnaire | saveQuestionnaireError | saveQuestionnaireSuccess;
