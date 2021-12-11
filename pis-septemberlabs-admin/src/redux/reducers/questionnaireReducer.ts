import { fromJS } from 'immutable';

import { QuestionnaireState } from '../types';

import {
  QuestionnaireActionTypes,
} from '../actions/types';

import {
  SET_IS_EDITING,
  GET_QUESTIONNAIRE_SUCCESS,
  SAVE_QUESTIONNAIRE_ERROR,
  SAVE_QUESTIONNAIRE_SUCCESS,
  GET_QUESTIONNAIRE_ERROR,
  CLEAR_QUESTIONNAIRE,
} from '../actions/constants';

export const initialState = fromJS({
  isEditing: false,
  questionnaire: null,
  error: false,
  saveQuestionnaireIsSuccess: null,
});

function questionnaireReducer(state = initialState, action: QuestionnaireActionTypes):
QuestionnaireState {
  switch (action.type) {
  case SET_IS_EDITING:
    return state
      .set('isEditing', action.payload);
  case GET_QUESTIONNAIRE_SUCCESS:
    return state
      .set('questionnaire', action.payload)
      .set('error', false);
  case GET_QUESTIONNAIRE_ERROR:
    return state
      .set('error', action.payload);
  case SAVE_QUESTIONNAIRE_ERROR:
    return state
      .set('error', action.payload);
  case SAVE_QUESTIONNAIRE_SUCCESS:
    return state
      .set('saveQuestionnaireIsSuccess', true);
  case CLEAR_QUESTIONNAIRE:
    return state
      .set('isEditing', false)
      .set('questionnaire', null)
      .set('error', false)
      .set('saveQuestionnaireIsSuccess', false);
  default:
    return state;
  }
}

export default questionnaireReducer;
