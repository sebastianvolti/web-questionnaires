import { combineReducers } from 'redux';
import appReducer, { initialState as appReducerInitialState } from './appReducer';
import questionnaireReducer, { initialState as questionnaireReducerInitialState } from './questionnaireReducer';

import {
  RootState,
} from '../types';

export const initialAppState = {
  appReducer: appReducerInitialState,
  questionnaireReducer: questionnaireReducerInitialState,
};

const mainReducer = combineReducers({
  appReducer,
  questionnaireReducer,
});

const rootReducer = (
  state = initialAppState,
  action: any,
): RootState => mainReducer(state, action);

export default rootReducer;
