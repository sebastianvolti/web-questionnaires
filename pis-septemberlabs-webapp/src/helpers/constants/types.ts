export type Questionnaire = {
  success: boolean,
  finish: boolean,
  data?: QuestionnaireData,
}

export type QuestionnaireData = {
  id: number,
  title: string,
  projectName: string,
  lastAnswer: number,
  participationId: number,
  questions: Activity[],
}

export type Activity = {
  id: number,
  questionTypeId: number,
  surveyId: number,
  required?: boolean,
  description: string,
  parameters: Parameters,
  answers?: Answer[],
}

export type Parameters = {
  categories?: string[],
  items?: string[],
  options?: string[],
  minimumOptions?: number,
}

export type Answer = {
  id?: number,
  participationId?: number,
  questionId: number,
  answer: AnswerData,
}

export type AnswerData = any
