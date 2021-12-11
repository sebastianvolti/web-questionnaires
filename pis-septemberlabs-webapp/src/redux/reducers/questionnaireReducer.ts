import { fromJS } from 'immutable';

import { QuestionnaireState } from '../types';
import { QuestionnaireActionTypes } from '../actions/types';

import { GET_QUESTIONNAIRE_SUCCESS, SET_ANSWER, GET_FINISH_STATUS} from '../actions/constants';
import { Activity, Answer, Questionnaire } from '../../helpers/constants/types';

export const initialState = fromJS({
  questionnaire: null,
});

function appReducer(
  state = initialState,
  action: QuestionnaireActionTypes,
): QuestionnaireState {
  switch (action.type) {
  case GET_QUESTIONNAIRE_SUCCESS:
    return state.set('questionnaire', action.payload);
  case SET_ANSWER: {
    const { index, answer } = action.payload;
    const questionnarie : Questionnaire = state.toJS().questionnaire;
    if (!questionnarie.data) return state;
    const { questions } = questionnarie.data;
    const activity : Activity = questions[index];
    const newAnswers : Answer[] = [{
      questionId: activity.id,
      answer,
    }];
    const newActivity = { ...activity, answers: newAnswers };
    const newQuestionnaire = {
      ...questionnarie,
      data: {
        ...questionnarie.data,
        questions: [...questions.slice(0, index), newActivity, ...questions.slice(index + 1)],
      },
    };
    return state.set('questionnaire', newQuestionnaire);
  }
  case GET_FINISH_STATUS:
    const questionnaire : Questionnaire = state.toJS().questionnaire;
    questionnaire.finish = action.payload.success;
    return state.set('questionnaire', questionnaire);
  default:
    return state;
  }
}

export default appReducer;
