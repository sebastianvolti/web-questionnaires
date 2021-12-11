export interface AppState {
  userData: string
}

export interface QuestionnaireState {
  questionnaire: string
}

export interface RootState {
  appReducer: AppState,
  questionnaireReducer: QuestionnaireState,
}
