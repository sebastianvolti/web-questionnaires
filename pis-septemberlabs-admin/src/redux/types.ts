export interface AppState {
  userData: string
  userDataError: any,
  userDataLoading: boolean,
}

export interface QuestionnaireState {
  isEditing: any,
  questionnaire: any,
  error: any,
  saveQuestionnaireIsSuccess: boolean,
}

export interface RootState {
  appReducer: AppState,
  questionnaireReducer: QuestionnaireState,
}
