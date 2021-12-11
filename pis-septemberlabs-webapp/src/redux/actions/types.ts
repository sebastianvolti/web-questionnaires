import {
  GET_USER_DATA_SUCCESS,
  GET_QUESTIONNAIRE,
  GET_QUESTIONNAIRE_SUCCESS,
  GET_USER_DATA,
  SET_ANSWER,
  GET_FINISH_STATUS,
} from './constants';
import { AnswerData, Questionnaire } from '../../helpers/constants/types';

interface getUserData {
  type: typeof GET_USER_DATA
  payload: any
}

interface getUserDataSuccess {
  type: typeof GET_USER_DATA_SUCCESS
  payload: any
}

interface getQuestionnaire {
  type: typeof GET_QUESTIONNAIRE
  meta: {
    timestamp: number
  }
}

interface getQuestionnaireSuccess {
  type: typeof GET_QUESTIONNAIRE_SUCCESS
  payload: Questionnaire
  meta: {
    timestamp: number
  }
}

interface getFinishStatus {
  type: typeof GET_FINISH_STATUS
  payload: any
}

interface setAnswer {
  type: typeof SET_ANSWER
  payload: { index: number, answer: AnswerData }
}

export type AppActionTypes = getUserDataSuccess | getUserData
export type QuestionnaireActionTypes = getQuestionnaire | getQuestionnaireSuccess | setAnswer | getFinishStatus
